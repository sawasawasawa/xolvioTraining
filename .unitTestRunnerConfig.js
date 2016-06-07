module.exports = {
    files: [
        {
            "type": "lib",
            "files": [
                // "tests/_support/react/**"
            ]
        },
        {
            "type": "mock",
            "files": [
                // "tests/unit/fixtures/getFormStepsContext_fixtures.js"
            ]
        },
        {
            "type": "src",
            files: [
                "src/imports/domain/appointment-service.js",
                "src/imports/domain/parent.js",
                "src/imports/domain/student.js",
                "src/imports/domain/student-factory.js",
                // "src/imports/**/*.js",
            ]
        },
        {
            type: "specs",
            files: [
                "src/imports/**/student-spec.js",
            ]
        }
    ]
};