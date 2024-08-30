sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'riskmanagementannotated/test/integration/FirstJourney',
		'riskmanagementannotated/test/integration/pages/RisksList',
		'riskmanagementannotated/test/integration/pages/RisksObjectPage'
    ],
    function(JourneyRunner, opaJourney, RisksList, RisksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('riskmanagementannotated') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRisksList: RisksList,
					onTheRisksObjectPage: RisksObjectPage
                }
            },
            opaJourney.run
        );
    }
);