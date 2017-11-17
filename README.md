#Connected factory workers

#### Supported Browsers
* Google Chrome

#### Config.js

```
./src/server/config/config.js is the file that configures your endpoints, such as your api or login endpoints based on your environment variables.

config.ignoreCertificates is an important configuration if you are using untrusted certificated in your development environments. It is currently set 'false', unless the "TRUST_INSECURE_CERTIFICATES" environment variable has been set to false.

###Run app
1. npm install
2. npm start