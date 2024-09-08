import { NextFunction, Request, Response } from "express";
import omise from 'omise';
import {
    UserModel,
    TransectionModel
} from '../../../../models';
import functionResponseError from '../../components/responseError'
const omiseClient = omise({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
})

export const CheckoutCreditCardPayment = async (req: Request, res: Response, next: NextFunction) => {
    const { token, memberId, amount, email, username } = req.body;
    const description = `${username} - ${memberId}`;
    try {
        const customer = await omiseClient.customers.create({
            email,
            description: description,
            card: token,
        });

        const charge: any = await omiseClient.charges.create({
            amount,
            currency: 'thb',
            customer: customer.id,
        });

        if (charge.status === 'successful') {
            try {
                let updatedRank;
                let commentDescription;

                if (amount === 30000) {
                    updatedRank = 'STARTER';
                    commentDescription = 'STARTER';
                } else if (amount === 80000) {
                    updatedRank = 'PREMIUM';
                    commentDescription = 'PREMIUM';
                } else if (amount === 200000) {
                    updatedRank = 'ENTERPRISE';
                    commentDescription = 'ENTERPRISE';
                }

                const transaction = new TransectionModel({
                    token: token,
                    amount: amount,
                    status: charge.status,
                    memberId: memberId,
                    type: 'credit-card',
                    description: commentDescription,
                });
                const expirationTime = new Date();
                expirationTime.setDate(expirationTime.getDate() + 30);

                const updatedUser = await UserModel.findByIdAndUpdate(memberId, {
                    rank: updatedRank,
                    userExpirationTime: expirationTime,
                });

                if (!updatedUser || !transaction) {
                    return res.status(404).json({ error: 'User not found' });
                }

                await transaction.save();
                await updatedUser.save();
            } catch (error) {
                console.error('Error:', error);
            }
        }
        // console.log('Charge -->', charge);
        res.send({
            amount: charge?.amount,
            status: charge?.status,
        });
    } catch (error) {
        console.log(error);
        functionResponseError(error, res)

    }
}

export const CheckoutPromptPay = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { token, amount, memberId } = req.body;
    try {
        const charge: any = await omiseClient.charges.create({
            amount,
            source: token,
            currency: 'thb',
        });

        // console.log('Charge -->', charge);
        // console.log('Charge -->', charge?.source?.scannable_code);

        const transaction = new TransectionModel({
            token: token,
            amount: amount,
            status: charge?.status,
            memberId: memberId,
            type: charge?.source?.type,
        });

        await transaction.save();

        res.send({
            downloadUri: charge?.source?.scannable_code?.image?.download_uri,
        });
    } catch (error) {
        functionResponseError(error, res)
        console.log(error);
    }
}

export const Webhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, key } = req.body;
        console.log(req.body);

        if (key === 'charge.complete') {
            if (data.status === 'successful' || data.status === 'failed') {
                const charge = {
                    id: data?.source?.id,
                    status: data?.status,
                    amount: data?.funding_amount,
                };

                if (charge.status === 'successful') {
                    let updatedRank;
                    let commentDescription;

                    if (charge.amount === 30000) {
                        updatedRank = 'STARTER';
                        commentDescription = 'STARTER';
                    } else if (charge.amount === 80000) {
                        updatedRank = 'PREMIUM';
                        commentDescription = 'PREMIUM';
                    } else if (charge.amount === 200000) {
                        updatedRank = 'ENTERPRISE';
                        commentDescription = 'ENTERPRISE';
                    }

                    const transaction = await TransectionModel.findOne({
                        token: charge.id,
                    });

                    if (transaction) {
                        await transaction.updateOne({
                            status: charge.status,
                            description: commentDescription,
                        });
                        console.log('Transaction updated:', transaction);

                        const expirationTime = new Date();
                        expirationTime.setDate(expirationTime.getDate() + 30);
                        const userId = transaction.memberId;

                        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
                            rank: updatedRank,
                            userExpirationTime: expirationTime,
                        });
                        if (!updatedUser || !transaction) {
                            return res.status(400).json({ error: 'User not found' });
                        }

                        await transaction.save();
                        await updatedUser.save();
                    } else {
                        console.log('Transaction not found for charge ID:', charge.id);
                    }
                } else if (charge.status === 'failed') {
                    const transaction = await TransectionModel.findOne({
                        token: charge.id,
                    });

                    if (transaction) {
                        await transaction.updateOne({ status: charge.status });
                    } else {
                    }
                }
            }
        }
    } catch (err) {

        console.log(err);
        functionResponseError(err, res)
    }
}

const intervalTimeInMilliseconds = 1000 * 60;
setInterval(async () => {
    const currentTime = new Date();
    const expiredUsers = await UserModel.find({
        rank: { $in: ['STARTER', 'PREMIUM', 'ENTERPRISE'] },
        userExpirationTime: { $lte: currentTime },
    });

    for (const user of expiredUsers) {
        await UserModel.findByIdAndUpdate(user._id, {
            rank: 'NOMAL',
            userExpirationTime: null,
        });
    }
}, intervalTimeInMilliseconds);