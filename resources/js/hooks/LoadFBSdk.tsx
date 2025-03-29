import { useEffect } from 'react';

const LoadFBSdk = () => {
    useEffect(() => {
        const loadFacebookSDK = () => {
            if (window.FB) {
                window.FB.XFBML.parse();
            } else {
                const script = document.createElement('script');
                script.id = 'facebook-jssdk';
                script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0';
                document.body.appendChild(script);

                script.onload = () => {
                    if (window.FB) {
                        window.FB.XFBML.parse();
                    }
                };
            }
        };

        loadFacebookSDK();
    }, []);
};

export default LoadFBSdk;
