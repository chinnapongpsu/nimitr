import { Redeem } from "@mui/icons-material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {
  Box,
  Divider,
  Typography,
  useTheme,
  Stack,
  Container,
  Grid,
  Button,
} from "@mui/material";
import * as React from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouteLink, useNavigate } from "react-router-dom";

import FooterBox from "../component/ui/introPage/footer";
import VideoCoverGrid from "../component/ui/introPage/videoDisplay";
import AuthContext from "../contexts/AuthContext";

export const PrivacyPolicyPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Box
        sx={{
          padding: 5,
        }}
      >
        <div>
          <Typography variant="h3">Privacy Policy</Typography>

          <p>
            <span style={{ fontSize: "11pt" }}>
              Last updated: January 16, 2024
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy.
            </span>

            <span style={{ fontSize: "11pt" }}>.</span>
          </p>
          <h2>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "13pt" }}>
                Interpretation and Definitions
              </span>
            </strong>
          </h2>
          <h3>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                Interpretation
              </span>
            </strong>
          </h3>
          <p>
            <span style={{ fontSize: "11pt" }}>
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </span>
          </p>
          <h3>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                Definitions
              </span>
            </strong>
          </h3>
          <p>
            <span style={{ fontSize: "11pt" }}>
              For the purposes of this Privacy Policy:
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Account</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;means a unique account created for You to access our Service
              or parts of our Service.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Affiliate</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;means an entity that controls, is controlled by or is under
              common control with a party, where "control" means ownership of
              50% or more of the shares, equity interest or other securities
              entitled to vote for election of directors or other managing
              authority.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Application</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;refers to Nimitr AR, the software program provided by the
              Company.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Company</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;(referred to as either "the Company", "We", "Us" or "Our" in
              this Agreement) refers to Stream South Technology Co. Ltd, Hat
              Yai, Songkhla, Thailand.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Cookies</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;are small files that are placed on Your computer, mobile
              device or any other device by a website, containing the details of
              Your browsing history on that website among its many uses.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Country</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>&nbsp;refers to: Thailand</span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Device</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;means any device that can access the Service such as a
              computer, a cellphone or a digital tablet.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Personal Data</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;is any information that relates to an identified or
              identifiable individual.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Service</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;refers to the Application or the Website or both.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Service Provider</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;means any natural or legal person who processes the data on
              behalf of the Company. It refers to third-party companies or
              individuals employed by the Company to facilitate the Service, to
              provide the Service on behalf of the Company, to perform services
              related to the Service or to assist the Company in analyzing how
              the Service is used.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Usage Data</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;refers to data collected automatically, either generated by
              the use of the Service or from the Service infrastructure itself
              (for example, the duration of a page visit).
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Website</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;refers to Nimitr, accessible from&nbsp;
            </span>
            <a href="https://www.nimitr.art">
              <span style={{ fontSize: "11pt" }}>https://www.nimitr.art</span>
            </a>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>You</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual
              is accessing or using the Service, as applicable.
            </span>
          </p>
          <h2>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "13pt" }}>
                Collecting and Using Your Personal Data
              </span>
            </strong>
          </h2>
          <h3>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                Types of Data Collected
              </span>
            </strong>
          </h3>
          <h4>
            <strong>
              <em>
                <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                  Personal Data
                </span>
              </em>
            </strong>
          </h4>
          <p>
            <span style={{ fontSize: "11pt" }}>
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Personally identifiable information may include, but
              is not limited to:
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>Email address</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>First name and last name</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>Phone number</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Address, State, Province, ZIP/Postal code, City
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>Usage Data</span>
          </p>
          <h4>
            <strong>
              <em>
                <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                  Usage Data
                </span>
              </em>
            </strong>
          </h4>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Usage Data is collected automatically when using the Service.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Usage Data may include information such as Your Device's Internet
              Protocol address (e.g. IP address), browser type, browser version,
              the pages of our Service that You visit, the time and date of Your
              visit, the time spent on those pages, unique device identifiers
              and other diagnostic data.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              When You access the Service by or through a mobile device, We may
              collect certain information automatically, including, but not
              limited to, the type of mobile device You use, Your mobile device
              unique ID, the IP address of Your mobile device, Your mobile
              operating system, the type of mobile Internet browser You use,
              unique device identifiers and other diagnostic data.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              We may also collect information that Your browser sends whenever
              You visit our Service or when You access the Service by or through
              a mobile device.
            </span>
          </p>
          <h4>
            <strong>
              <em>
                <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                  Tracking Technologies and Cookies
                </span>
              </em>
            </strong>
          </h4>
          <p>
            <span style={{ fontSize: "11pt" }}>
              We use Cookies and similar tracking technologies to track the
              activity on Our Service and store certain information. Tracking
              technologies used are beacons, tags, and scripts to collect and
              track information and to improve and analyze Our Service. The
              technologies We use may include:
            </span>
          </p>
          <ul>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <strong>
                  <span style={{ fontSize: "11pt" }}>
                    Cookies or Browser Cookies.
                  </span>
                </strong>
                <span style={{ fontSize: "11pt" }}>
                  &nbsp;A cookie is a small file placed on Your Device. You can
                  instruct Your browser to refuse all Cookies or to indicate
                  when a Cookie is being sent. However, if You do not accept
                  Cookies, You may not be able to use some parts of our Service.
                  Unless you have adjusted Your browser setting so that it will
                  refuse Cookies, our Service may use Cookies.
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <strong>
                  <span style={{ fontSize: "11pt" }}>Web Beacons.</span>
                </strong>
                <span style={{ fontSize: "11pt" }}>
                  &nbsp;Certain sections of our Service and our emails may
                  contain small electronic files known as web beacons (also
                  referred to as clear gifs, pixel tags, and single-pixel gifs)
                  that permit the Company, for example, to count users who have
                  visited those pages or opened an email and for other related
                  website statistics (for example, recording the popularity of a
                  certain section and verifying system and server integrity).
                </span>
              </p>
            </li>
          </ul>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Cookies can be "Persistent" or "Session" Cookies. Persistent
              Cookies remain on Your personal computer or mobile device when You
              go offline,
            </span>
            <span style={{ fontSize: "11pt" }}>&nbsp;article.</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              We use both Session and Persistent Cookies for the purposes set
              out below:
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>
                Necessary / Essential Cookies
              </span>
            </strong>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>Type: Session Cookies</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>Administered by: Us</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Purpose: These Cookies are essential to provide You with services
              available through the Website and to enable You to use some of its
              features. They help to authenticate users and prevent fraudulent
              use of user accounts. Without these Cookies, the services that You
              have asked for cannot be provided, and We only use these Cookies
              to provide You with those services.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>
                Cookies Policy / Notice Acceptance Cookies
              </span>
            </strong>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>Type: Persistent Cookies</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>Administered by: Us</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Purpose: These Cookies identify if users have accepted the use of
              cookies on the Website.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>Functionality Cookies</span>
            </strong>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>Type: Persistent Cookies</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>Administered by: Us</span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Purpose: These Cookies allow us to remember choices You make when
              You use the Website, such as remembering your login details or
              language preference. The purpose of these Cookies is to provide
              You with a more personal experience and to avoid You having to
              re-enter your preferences every time You use the Website.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              For more information about the cookies we use and your choices
              regarding cookies, please visit our Cookies Policy or the Cookies
              section of our Privacy Policy.
            </span>
          </p>
          <h3>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                Use of Your Personal Data
              </span>
            </strong>
          </h3>
          <p>
            <span style={{ fontSize: "11pt" }}>
              The Company may use Personal Data for the following purposes:
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>
                To provide and maintain our Service
              </span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              , including to monitor the usage of our Service.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>To manage Your Account:</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;to manage Your registration as a user of the Service. The
              Personal Data You provide can give You access to different
              functionalities of the Service that are available to You as a
              registered user.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>
                For the performance of a contract:
              </span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;the development, compliance and undertaking of the purchase
              contract for the products, items or services You have purchased or
              of any other contract with Us through the Service.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>To contact You:</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;To contact You by email, telephone calls, SMS, or other
              equivalent forms of electronic communication, such as a mobile
              application's push notifications regarding updates or informative
              communications related to the functionalities, products or
              contracted services, including the security updates, when
              necessary or reasonable for their implementation.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>To provide You</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;with news, special offers and general information about
              other goods, services and events which we offer that are similar
              to those that you have already purchased or enquired about unless
              You have opted not to receive such information.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>To manage Your requests:</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;To attend and manage Your requests to Us.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>For business transfers:</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              &nbsp;We may use Your information to evaluate or conduct a merger,
              divestiture, restructuring, reorganization, dissolution, or other
              sale or transfer of some or all of Our assets, whether as a going
              concern or as part of bankruptcy, liquidation, or similar
              proceeding, in which Personal Data held by Us about our Service
              users is among the assets transferred.
            </span>
          </p>
          <p>
            <strong>
              <span style={{ fontSize: "11pt" }}>For other purposes</span>
            </strong>
            <span style={{ fontSize: "11pt" }}>
              : We may use Your information for other purposes, such as data
              analysis, identifying usage trends, determining the effectiveness
              of our promotional campaigns and to evaluate and improve our
              Service, products, services, marketing and your experience.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              We may share Your personal information in the following
              situations:
            </span>
          </p>
          <ul>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <strong>
                  <span style={{ fontSize: "11pt" }}>
                    With Service Providers:
                  </span>
                </strong>
                <span style={{ fontSize: "11pt" }}>
                  &nbsp;We may share Your personal information with Service
                  Providers to monitor and analyze the use of our Service, to
                  contact You.
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <strong>
                  <span style={{ fontSize: "11pt" }}>
                    For business transfers:
                  </span>
                </strong>
                <span style={{ fontSize: "11pt" }}>
                  &nbsp;We may share or transfer Your personal information in
                  connection with, or during negotiations of, any merger, sale
                  of Company assets, financing, or acquisition of all or a
                  portion of Our business to another company.
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <strong>
                  <span style={{ fontSize: "11pt" }}>With Affiliates:</span>
                </strong>
                <span style={{ fontSize: "11pt" }}>
                  &nbsp;We may share Your information with Our affiliates, in
                  which case we will require those affiliates to honor this
                  Privacy Policy. Affiliates include Our parent company and any
                  other subsidiaries, joint venture partners or other companies
                  that We control or that are under common control with Us.
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <strong>
                  <span style={{ fontSize: "11pt" }}>
                    With business partners:
                  </span>
                </strong>
                <span style={{ fontSize: "11pt" }}>
                  &nbsp;We may share Your information with Our business partners
                  to offer You certain products, services or promotions.
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <strong>
                  <span style={{ fontSize: "11pt" }}>With other users:</span>
                </strong>
                <span style={{ fontSize: "11pt" }}>
                  &nbsp;when You share personal information or otherwise
                  interact in the public areas with other users, such
                  information may be viewed by all users and may be publicly
                  distributed outside.
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <strong>
                  <span style={{ fontSize: "11pt" }}>With Your consent</span>
                </strong>
                <span style={{ fontSize: "11pt" }}>
                  : We may disclose Your personal information for any other
                  purpose with Your consent.
                </span>
              </p>
            </li>
          </ul>
          <h3>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                Retention of Your Personal Data
              </span>
            </strong>
          </h3>
          <p>
            <span style={{ fontSize: "11pt" }}>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              The Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods.
            </span>
          </p>
          <h3>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                Transfer of Your Personal Data
              </span>
            </strong>
          </h3>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Your information, including Personal Data, is processed at the
              Company's operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country or other
              governmental jurisdiction where the data protection laws may
              differ than those from Your jurisdiction.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              The Company will take all steps reasonably necessary to ensure
              that Your data is treated securely and in accordance with this
              Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of Your data and other
              personal information.
            </span>
          </p>
          <h3>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                Delete Your Personal Data
              </span>
            </strong>
          </h3>
          <p>
            <span style={{ fontSize: "11pt" }}>
              You have the right to delete or request that We assist in deleting
              the Personal Data that We have collected about You.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Our Service may give You the ability to delete certain information
              about You from within the Service.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              You may update, amend, or delete Your information at any time by
              signing in to Your Account, if you have one, and visiting the
              account settings section that allows you to manage Your personal
              information. You may also contact Us to request access to,
              correct, or delete any personal information that You have provided
              to Us.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Please note, however, that We may need to retain certain
              information when we have a legal obligation or lawful basis to do
              so.
            </span>
          </p>
          <h3>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                Disclosure of Your Personal Data
              </span>
            </strong>
          </h3>
          <h4>
            <strong>
              <em>
                <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                  Business Transactions
                </span>
              </em>
            </strong>
          </h4>
          <p>
            <span style={{ fontSize: "11pt" }}>
              If the Company is involved in a merger, acquisition or asset sale,
              Your Personal Data may be transferred. We will provide notice
              before Your Personal Data is transferred and becomes subject to a
              different Privacy Policy.
            </span>
          </p>
          <h4>
            <strong>
              <em>
                <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                  Law enforcement
                </span>
              </em>
            </strong>
          </h4>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Under certain circumstances, the Company may be required to
              disclose Your Personal Data if required to do so by law or in
              response to valid requests by public authorities (e.g. a court or
              a government agency).
            </span>
          </p>
          <h4>
            <strong>
              <em>
                <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                  Other legal requirements
                </span>
              </em>
            </strong>
          </h4>
          <p>
            <span style={{ fontSize: "11pt" }}>
              The Company may disclose Your Personal Data in the good faith
              belief that such action is necessary to:
            </span>
          </p>
          <ul>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Comply with a legal obligation
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Protect and defend the rights or property of the Company
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Prevent or investigate possible wrongdoing in connection with
                  the Service
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Protect the personal safety of Users of the Service or the
                  public
                </span>
              </p>
            </li>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  Protect against legal liability
                </span>
              </p>
            </li>
          </ul>
          <h3>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "11pt" }}>
                Security of Your Personal Data
              </span>
            </strong>
          </h3>
          <p>
            <span style={{ fontSize: "11pt" }}>
              The security of Your Personal Data is important to Us, but
              remember that no method of transmission over the Internet, or
              method of electronic storage is 100% secure. While We strive to
              use commercially acceptable means to protect Your Personal Data,
              We cannot guarantee its absolute security.
            </span>
          </p>
          <h2>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "13pt" }}>
                Children's Privacy
              </span>
            </strong>
          </h2>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from anyone
              under the age of 13. If You are a parent or guardian and You are
              aware that Your child has provided Us with Personal Data, please
              contact Us. If We become aware that We have collected Personal
              Data from anyone under the age of 13 without verification of
              parental consent, We take steps to remove that information from
              Our servers.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              If We need to rely on consent as a legal basis for processing Your
              information and Your country requires consent from a parent, We
              may require Your parent's consent before We collect and use that
              information.
            </span>
          </p>
          <h2>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "13pt" }}>
                Links to Other Websites
              </span>
            </strong>
          </h2>
          <p>
            <span style={{ fontSize: "11pt" }}>
              Our Service may contain links to other websites that are not
              operated by Us. If You click on a third party link, You will be
              directed to that third party's site. We strongly advise You to
              review the Privacy Policy of every site You visit.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              We have no control over and assume no responsibility for the
              content, privacy policies or practices of any third party sites or
              services.
            </span>
          </p>
          <h2>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "13pt" }}>
                Changes to this Privacy Policy
              </span>
            </strong>
          </h2>
          <p>
            <span style={{ fontSize: "11pt" }}>
              We may update Our Privacy Policy from time to time. We will notify
              You of any changes by posting the new Privacy Policy on this page.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              We will let You know via email and/or a prominent notice on Our
              Service, prior to the change becoming effective and update the
              "Last updated" date at the top of this Privacy Policy.
            </span>
          </p>
          <p>
            <span style={{ fontSize: "11pt" }}>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </span>
          </p>
          <h2>
            <strong>
              <span style={{ color: "#4f81bd", fontSize: "13pt" }}>
                Contact Us
              </span>
            </strong>
          </h2>
          <p>
            <span style={{ fontSize: "11pt" }}>
              If you have any questions about this Privacy Policy, You can
              contact us:
            </span>
          </p>
          <ul>
            <li style={{ listStyleType: "disc", fontSize: "11pt" }}>
              <p>
                <span style={{ fontSize: "11pt" }}>
                  By email: info@streamsouth.tech
                </span>
              </p>
            </li>
          </ul>
        </div>
      </Box>
    </Container>
  );
};
