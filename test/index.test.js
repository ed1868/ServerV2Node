import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import Message from '../models/Message';
import App from '../app';
import contactRoutes from '../routes/contact'

// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
// });

describe('Testing Queries v1 parse 1 ', () => {
  describe('[POST] /contact', () => {
    it('response should have created a user and sent a new email with contact information', async () => {



      const testPayload = {
        userId: "AdminTest",
        email: "admin@gmail.com",
        subject:"JUST A TESTING MESSAGE",
        text:"testing for sure",
        previousMessages: [
          "just one message",
          "just two messages"
        ]
      }



      Message.find = jest.fn().mockReturnValue(null);
      Message.create = jest.fn().mockReturnValue({
        _id: '00212456',
        email: testPayload.email,
        subject: testPayload.subject,
        status: testPayload.status,
        text: testPayload.text,
        previousMessages: testPayload.previousMessages,
        
      });

      
      const app = new App([contactRoutes]);
      return request(app.getServer()).post(`${contactRoutes.path}/request`).send(testPayload);
    });
  });
});
