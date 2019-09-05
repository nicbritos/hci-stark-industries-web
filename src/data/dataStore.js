export default new DataStore();

class DataStore {
    constructor(database) {
        this._database = database;

        this.endpoints = [];
        this.workshops = [];
        this.questions = [];
        this.users = [];

        this._endpointsMap = {};
        this._workshopsMap = {};
        this._questionsMap = {};
        this._responsesMap = {};
        this._usersArray = {};
    }

    async loadEndpoints() {
        // TODO: Handle errors
        let endpoints = await this._database.loadEndpoints();
        for (let endpoint of endpoints) {
            this.endpoints.push(endpoint);
            this._endpointsMap[endpoint.id] = endpoint;
        }
    }

    async loadWorkshops(endpointId) {
        // TODO: Handle errors
        let workshops = await this._database.loadWorkshops(endpointId);
        this._workshopsMap[endpointId] = {};
        this._responsesMap[endpointId] = {};
        for (let workshop of workshops) {
            this._endpointsMap[endpointId].workshops.push(workshop);
            this._workshopsMap[endpointId][workshop.id] = workshop;
            this._responsesMap[endpointId][workshop.id] = {};
        }
    }

    async loadQuestions() {
        // TODO: Handle errors
        let questions = await this._database.loadQuestions();
        for (let question of questions) {
            this.questions.push(question);
            this._questionsMap[question.id] = question;
        }
    }

    async loadResponses(endpointId, workshopId) {
        // TODO: Handle errors
        let allResponses = await this._database.loadResponses(endpointId, workshopId);

        // Forma: { person: [{person: person, question: questionId, type: type, value: value}]}
        for (let personResponses of allResponses) {
            this._responsesMap[endpointId][workshopId][personResponses.person] = personResponses;
            for (let response of personResponses) {
                this._workshopsMap[endpointId][workshopId].responses.push(response);
            }
        }
    }


}

