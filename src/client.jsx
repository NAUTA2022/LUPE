import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
// const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;
const clientId = "9ec181bc898d4d17a48fb1e7a8cc66f6";

/* export const client = createThirdwebClient({
  clientId: clientId,
}); */

export const client = createThirdwebClient({ clientId });
