import * as argon2 from 'argon2';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    let createdUsers = [];

    for (let i = 0; i < 1400; i++) {
        const randomBoolTags = Math.random() < 0.5;
        const randomBoolReminder = Math.random() < 0.5;
        const reminder = randomBoolReminder
            ? {}
            : {
                  start: '12:00',
                  end: '15:00',
              };

        const tags = randomBoolTags
            ? []
            : Array.from({ length: Math.floor(Math.random() * 10) }).map(
                  () => ({
                      name: faker.word.conjunction(),
                      description: faker.lorem.paragraphs(2),
                  }),
              );

        const todosRequirements = { tags };

        if (!!reminder?.start) todosRequirements['reminder'] = reminder;

        const todos = Array.from({
            length: Math.floor(Math.random() * 10),
        }).map(() => ({
            title: faker.lorem.paragraph(4),
            description: faker.lorem.sentences(2),
            color: faker.color.human(),
            endOfTheTime: faker.date
                .between(dayjs().toDate(), dayjs().add(2, 'month').toDate())
                .toString(),

            ...todosRequirements,
        }));

        const createdUser = await prisma.user.upsert({
            where: { username: 'rasad' },
            update: {},
            create: {
                username: faker.name.fullName(),
                password: await argon2.hash('1234567'),
                todos: {
                    create: todos,
                },
            },
        });

        createdUsers.push(createdUser);
    }

    console.log(createdUsers);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
