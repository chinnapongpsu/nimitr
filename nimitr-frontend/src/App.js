import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { LandingLayout } from "./component/LandingLayout";
import PrivateRoute from "./component/PrivateRoute";
import { CheckTranscript } from "./page/checkTranscriptUser-page";
import { HelpAndSupportPage } from "./page/help-and-support-page";
import { IntroPage } from "./page/intro-page";
import { LoginPage } from "./page/login-page";
import { MainPage } from "./page/main-page";
import { PaymentPage } from "./page/manage-payment-page";
import { ManageProjectPage } from "./page/manage-project-page";
import { MarkerControlPage } from "./page/marker-control-page";
import { PrivacyPolicyPage } from "./page/privacy-policy-page";
import { RecommendPage } from "./page/recommend-page";
import { RegisterPage } from "./page/register-page";
import { ForgotPasswordPage } from "./page/forgot-password-page";
import { ChangePassword} from "./page/change-password-page";
import { CheckEmail } from "./page/check-email-page";

const App = () => (
  <LandingLayout>
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/support" element={<HelpAndSupportPage />} />
      <Route path="/forgot" element={<ForgotPasswordPage />} />
      <Route path="/change/:token/:id" element={<ChangePassword />} />
      <Route path="/check" element={<CheckEmail />} />
      <Route exact path="/" element={<PrivateRoute />}>
        <Route path="/project" element={<MainPage />} />
        <Route path="/control/marker" element={<MarkerControlPage />} />
        <Route path="/project/:projectId" element={<ManageProjectPage />} />
        <Route path="/payment/:memberUserId" element={<PaymentPage />} />
        <Route
          path="/payment/checking/:memberId"
          element={<CheckTranscript />}
        />
      </Route>
    </Routes>
  </LandingLayout>
);

export default App;
