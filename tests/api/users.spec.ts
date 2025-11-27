import { expect, request, test } from '@playwright/test';

test.describe('basic crud operations', () => {

  // CREATE
  test('create a post', async ({ request }) => {
    const payload = {
      title: "foo",
      body: "bar",
      userId: 1
    };

    const response = await request.post('/posts', { data: payload });
    expect(response.status()).toBe(201);

    const json = await response.json();
    console.log("created json", json);

    expect(json.id).toBeDefined();
  });

  // GET
  test("get details", async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);

    const json = await response.json();
    console.log("Get Details", json);

    expect(json).toHaveProperty('id', 1);
  });

  // UPDATE
  test('update data', async ({ request }) => {
    const payload = {
      id: 1,
      title: "updated title",
      body: "updated body",
      userId: 1
    };

    const response = await request.put('/posts/1', { data: payload });
    expect(response.status()).toBe(200);

    const json = await response.json();
    console.log("updated data", json);

    expect(json.title).toBe("updated title");
  });

  // DELETE
  test('delete data', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);

    console.log("data deleted");
  });

  // COMPLEX JSON
  test('complex json assertion with GET method', async ({ request }) => {
    const response = await request.get('/api/users?page=1');
    expect(response.status()).toBe(200);

    const json = await response.json();
    console.log("complex json", json);

    expect(json).toHaveProperty("page");
    expect(json).toHaveProperty('total');
    expect(json).toHaveProperty('data');

    expect(Array.isArray(json.data)).toBe(true);
    expect(json.data.length).toBeGreaterThan(0);

    const firstUser = json.data[0];
    expect(firstUser).toHaveProperty("id");
    expect(firstUser).toHaveProperty("email");
    expect(firstUser.avatar).toContain("https://");
  });
});


// CREATE USER BLOCK FIXED
test.describe('Complex GET Response Assertions', () => {

  let userId: string;

  test('create user', async ({ request }) => {
    const payload = {
      name: "harshit",
      job: "sdet"
    };

    const response = await request.post('/api/users', { data: payload });
    expect(response.status()).toBe(201);

    const json = await response.json();   // FIXED
    console.log("created user", json);

    userId = json.id;                     // FIXED
    expect(userId).toBeDefined();
  });
});


// DummyJSON test is correct
test("POST using DummyJSON", async ({ request }) => {
  const response = await request.post("https://dummyjson.com/users/add", {
    data: {
      firstName: "Harshit",
      lastName: "Mishra",
      age: 28
    }
  });

  console.log("STATUS:", response.status());

  const json = await response.json();
  console.log("JSON:", json);

  expect(response.status()).toBe(201);
  expect(json.id).toBeDefined();
});
