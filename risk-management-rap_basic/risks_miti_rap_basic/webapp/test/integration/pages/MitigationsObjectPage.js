sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'risks.manage.basic.rap.risksmitirapbasic',
            componentId: 'MitigationsObjectPage',
            contextPath: '/Risks/_Mitigations'
        },
        CustomPageDefinitions
    );
});