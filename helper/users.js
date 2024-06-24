import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { getSession } from "next-auth/react";

export async function getUserDataFromServer() {
  try {
    const responseData = { users: [] };
 
    const users = await getUsersFromMongo();
   
    responseData.users = users.data;
    return responseData;
    
  } catch (error) {
    return { error: error };
  }
}

async function getUsersFromMongo() {
  const session = await getSession();
  try {
    const response = await axios.get(`${baseUrl}/api/user/`, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return response;
  } catch (error) {
    return { error: error };
  }
}

export async function addUserFromServer(user) {
  // console.log(user,"user value is")
  try {
    const response = await axios.post(`${baseUrl}/api/register`, {
      fullname: user.fullname,
      createdStore:user.createdStore,
      gender: user.gender,
      dob: user.dob,
      phone: user.phone,
      email: user.email,
      password: user.password,
      role: user.role,

    });
    return response;
  
  } catch (error) {
    throw error;
  }
}

export async function updateUserFromServer(user) {
  const session = await getSession();
  try {
    const response = await axios.patch(
      `${baseUrl}/api/user/${user.id}`,
      {
        fullname: user.fullname,
        dob: user.dob,
        phone: user.phone,
        gender: user.gender,
        active: user.status,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getLoyalty(startDate, endDate) {
  const session = await getSession();
  try {
    const response = await axios.get(
      `${baseUrl}/api/loyalty/date?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return { error: error };
  }
}
export async function getLoyaltyPointFromServer(phone, dob = "") {
  const url = `${baseUrl}/api/loyalty/${phone}${
    dob == "" ? "" : `&dob=${dob}`
  }`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    return { error: error };
  }
}

export async function updateLoyaltyPointFromServer(loyalty) {
  const session = await getSession();
  try {
    const response = await axios.post(
      `${baseUrl}/api/loyalty`,
      {
        loyalty,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return { error: error };
  }
}

export async function getLoyaltyRate() {
  const session = await getSession();
  try {
    const response = await axios.get(`${baseUrl}/api/loyalty`, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return { error: error };
  }
}
