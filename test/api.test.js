const request = require("supertest");
const app = require("../app");

let companyID;
let applicationID;

test('creates a company', async () => {
    const res = await request(app)
    .post('/companies')
    .send({ name: 'Acme', industry: 'Tech', website: 'acme.com'});
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Acme');
    companyID = res.body.id;

}); 

test('create an application', async () => {
    const res = await request(app)
    .post('/applications')
    .send({ company_id: companyID, role: 'Software Engineer', status: 'applied', date_applied:'11-10-2026'});
    expect(res.statusCode).toBe(200);
    expect(res.body.role).toBe('Software Engineer');
    applicationID = res.body.id;
});

test('patch application status', async () => {
    const res = await request(app)
    .patch(`/applications/${applicationID}`)
    .send({status: 'offer'});
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('offer');
});