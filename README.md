This demonstration highlights the smooth integration of Rally elements within a Next.js and React-based application, providing a clear example of how you can efficiently create a customized checkout experience for your customers.

## Getting Started

Begin by installing the necessary dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Next, to launch the development server with https:

1. Add certificates folder in the root of the project
2. Generate the certificate inside the specified folder for localhost using the following command
  ```openssl req -x509 -out localhost.crt -keyout localhost.key \
  -days 365 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")```
3. Double click on the created certificate `localhost.crt` inside finder to add it to your Keychain and change preferences for it to Always Trust
4. Run 
```bash
npm run https
# or
yarn https
# or
pnpm https
```

Open [https://localhost:3000](https://localhost:3000) with your browser to view the result.

## Learn More

For more information on Rally elements, visit our [documentation](https://developers.rallyon.com/docs/jssdk/elements/overview/).

## Deploy on Vercel

The most straightforward way to deploy your Next.js application is by utilizing the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), which comes directly from the creators of Next.js.

For further details, consult our [Next.js deployment documentation](https://nextjs.org/docs/deployment).