import supertest from 'supertest'
import app from '../backendApp'


describe('Testing workout endpoint', function() {
   test("Response header should contain JSON", async() =>{
      const response = await supertest(app).get("/api/workouts/")
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
   })
})