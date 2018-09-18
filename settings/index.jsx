function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Mylo Fitbit Account</Text>}>
        <Oauth
          settingsKey="oauth"
          title="Login"
          label="Fitbit"
          status="Login"
          authorizeUrl="https://www.fitbit.com/oauth2/authorize"
          requestTokenUrl="https://api.fitbit.com/oauth2/token"
          clientId="xxxxx"
          clientSecret="xxxxxxxxxxxxx"
          scope="profile"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
