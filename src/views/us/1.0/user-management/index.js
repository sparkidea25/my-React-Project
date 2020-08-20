import { connect } from "react-redux";
import { Screen } from "./screen";

const mapStateToProps = (state) => {
  return {
      admins: ADMIN,
      users: USERS,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export const UserManagementScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);

const ADMIN = [
  {
    first_name: "Gold",
    last_name: "Roger",
    username: "pirateKing",
    email: "roger@yahoo.com",
    phone: "+91-9876543210",
    home_town: "grand line",
    time_zone: "EST",
    age: 33,
    date_added: "8-20-2020",
    last_active: "1 hour ago",
  },
  {
    first_name: "Edward",
    last_name: "Newgate",
    username: "whiteBeard",
    email: "newgate@yahoo.com",
    phone: "+44-8463-6547",
    home_town: "London",
    time_zone: "GMT +1",
    age: 30,
    date_added: "8-02-2020",
    last_active: "5 hour ago",
  },
  
];

const USERS = [
    {
      first_name: "Ragnar",
      last_name: "Lodbrok",
      username: "viking",
      email: "ragnar@yahoo.com",
      phone: "+45-9876-4321",
      home_town: "ragnar",
      time_zone: "GMT +2",
      age: 33,
      date_added: "8-20-2020",
      last_active: "online",
    },
    {
      first_name: "Alice",
      last_name: "Wordsworth",
      username: "wordsworth",
      email: "wordsworth@yahoo.com",
      phone: "+44-8463-6547",
      home_town: "London",
      time_zone: "GMT +1",
      age: 27,
      date_added: "8-02-2020",
      last_active: "5 mins ago",
    },
    {
        first_name: "Ragnar",
        last_name: "Lodbrok",
        username: "viking",
        email: "ragnar@yahoo.com",
        phone: "+45-9876-4321",
        home_town: "ragnar",
        time_zone: "GMT +2",
        age: 33,
        date_added: "8-20-2020",
        last_active: "online",
      },
      {
        first_name: "Alice",
        last_name: "Wordsworth",
        username: "wordsworth106",
        email: "wordsworth@yahoo.com",
        phone: "+44-8463-6547",
        home_town: "London",
        time_zone: "GMT +1",
        age: 27,
        date_added: "8-02-2020",
        last_active: "5 mins ago",
      },
      {
        first_name: "Ragnar",
        last_name: "Lodbrok",
        username: "viking101",
        email: "ragnar@yahoo.com",
        phone: "+45-9876-4321",
        home_town: "ragnar",
        time_zone: "GMT +2",
        age: 33,
        date_added: "8-20-2020",
        last_active: "online",
      },
      {
        first_name: "Alice",
        last_name: "Wordsworth",
        username: "wordsworth101",
        email: "wordsworth@yahoo.com",
        phone: "+44-8463-6547",
        home_town: "London",
        time_zone: "GMT +1",
        age: 27,
        date_added: "8-02-2020",
        last_active: "5 mins ago",
      },
      {
        first_name: "Ragnar",
        last_name: "Lodbrok",
        username: "viking102",
        email: "ragnar@yahoo.com",
        phone: "+45-9876-4321",
        home_town: "ragnar",
        time_zone: "GMT +2",
        age: 33,
        date_added: "8-20-2020",
        last_active: "online",
      },
      {
        first_name: "Alice",
        last_name: "Wordsworth",
        username: "wordsworth102",
        email: "wordsworth@yahoo.com",
        phone: "+44-8463-6547",
        home_town: "London",
        time_zone: "GMT +1",
        age: 27,
        date_added: "8-02-2020",
        last_active: "5 mins ago",
      },
  ];
