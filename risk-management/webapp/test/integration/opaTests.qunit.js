sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'risk/management/riskmanagement/test/integration/FirstJourney',
		'risk/management/riskmanagement/test/integration/pages/RisksList',
		'risk/management/riskmanagement/test/integration/pages/RisksObjectPage'
    ],
    function(JourneyRunner, opaJourney, RisksList, RisksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('risk/management/riskmanagement') + '/index.html'
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