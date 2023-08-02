import {
  date,
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

// declaring enum in database
export const phoneNumbers = mysqlTable(
  "phone_numbers",
  {
    id: serial("id").primaryKey(),
    phoneNumber: varchar("phone_number", { length: 512 }),
    userId: serial("user_id").references(() => users.id),
  },
  (phoneNumbers) => ({
    phoneNumberIndex: uniqueIndex("phone_number_index").on(
      phoneNumbers.phoneNumber
    ),
  })
);

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("name", { length: 512 }),
  password: varchar("password", { length: 2048 }),
  passwordConfirm: varchar("password_confirm", { length: 2048 }),
  email: varchar("email", { length: 512 }).unique(),
  dob: date("dob"),
  gender: mysqlEnum("gender", ["m", "f", "o"]),
});
