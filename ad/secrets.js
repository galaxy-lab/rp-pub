const tenantId = "33cc7bb2-6cdc-4fb2-85f4-870fa16c6cb5";
const clientId = "68038043-5061-45b8-a7c3-de5a444cc3b5";
const clientSecret = "3ZN7Q~W8GVvFuDqy4vPNKKNG6LOmPb1craAzz";
const grant_type = 'client_credentials'
const auth_url = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`
// const scopes = ['User.ManageIdentities.All', 'User.Read.All','User.ReadWrite.All','Directory.ReadWrite.All'];
const scopes = 'https://graph.microsoft.com/.default'


module.exports = {
    tenantId: tenantId, 
    clientId: clientId,
    clientSecret: clientSecret,
    scopes: scopes, 
    grant_type: grant_type,
    auth_url: auth_url,
}