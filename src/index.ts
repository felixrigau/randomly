type User = {
  name: string,
}

const printUserName = (user: User): void => { console.log(user.name) }

printUserName({name: 'felix'})