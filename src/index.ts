type User = {
  name: string;
};

export const printUserName = (user: User): string => user.name;
