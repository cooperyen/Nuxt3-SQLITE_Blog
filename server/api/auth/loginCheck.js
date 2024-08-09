import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const ip = await getIP();
  const user = await prismaClient.user.findUnique({
    where: {
      id: query.id,
    },
  });

  // user have value.
  if (user != null) {
    if (minuts(user.loginTime) < 60) return true;
    else return false;
  }
  // user have not value.
  if (user === null) return false;
});

async function getIP() {
  const currentIP = await fetch('https://api.ipify.org?format=json');
  const res = await currentIP.json();
  return res.ip;
}

function minuts(times) {
  const time = new Date() - new Date(times);
  const minuts = time / (1000 * 60);
  return minuts;
}
