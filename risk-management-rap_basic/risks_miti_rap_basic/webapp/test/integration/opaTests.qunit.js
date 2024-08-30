sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'risks/manage/basic/rap/risksmitirapbasic/test/integration/FirstJourney',
		'risks/manage/basic/rap/risksmitirapbasic/test/integration/pages/RisksList',
		'risks/manage/basic/rap/risksmitirapbasic/test/integration/pages/RisksObjectPage',
		'risks/manage/basic/rap/risksmitirapbasic/test/integration/pages/MitigationsObjectPage'
    ],
    function(JourneyRunner, opaJourney, RisksList, RisksObjectPage, MitigationsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('risks/manage/basic/rap/risksmitirapbasic') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheRisksList: RisksList,
					onTheRisksObjectPage: RisksObjectPage,
					onTheMitigationsObjectPage: MitigationsObjectPage
                }
            },
            opaJourney.run
        );
    }
);