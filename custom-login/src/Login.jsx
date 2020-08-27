/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { useEffect } from 'react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import config from './config';
import { useOktaAuth } from '@okta/okta-react';

const Login = () => {
 

  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config.oidc;
    const widget = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      logo: '/react.svg',
      i18n: {
        en: {
          'primaryauth.title': 'TEST in to React & Company',
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        responseMode: pkce ? 'query' : 'fragment',
        scopes,
      },
      tokenManager: {
        autoRenew: true,
        expireEarlySeconds: 240
      }
    });

    console.log("in login authclient manager");
    console.log(widget.authClient.tokenManager);

    widget.authClient.tokenManager.on('error',function(error){
      console.log(error);
    })

    
   

    widget.renderEl(
     
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called beacuse we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      (err) => {
        throw err;
      },
    );


    widget.on('expired',function(key,expiredToken){
      console.log('Token with key',key,'has expired');
      console.log(expiredToken);
    });

    
  
    widget.on('ready', function (context) {
      // The Widget is ready for user input
      console.log("widget is ready")
    });

    widget.on('afterRender', function (context) {
      console.log("in after render method")
      if (context.controller !== 'forgot-password') {
        return;
      }
      var backLink = document.getElementsByClassName('js-back')[0];
      backLink.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        // Custom link behavior
      });
    });
    
    widget.on('pageRendered', function (data) {
      console.log("in page render method")
      console.log(data);
      // { page: 'forgot-password' }
    });
    
  }, []);

 

  return (
    <div>
      <div id="sign-in-widget" />
    </div>
  );
};
export default Login;
