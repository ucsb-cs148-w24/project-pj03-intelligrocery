import { post } from 'aws-amplify/api';

async function intelligroceryFunction() {
  try {
    const restOperation = post({
      apiName: 'intelligroceryAPI',
      path: '/intelligrocery',
      options: {
        body: {
          message: 'Mow the lawn'
        }
      }
    });

    const { body } = await restOperation.response;
    const response = await body.json();

    console.log('POST call succeeded');
    console.log(response);
  } catch (e) {
    console.log('POST call failed: ', e);
  }
}