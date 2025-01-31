interface TWishlist {
  uid: string | null;
  title: string,
  image: string,
  price: string | number,
  pathname: string,
}

interface TUserToMongo {
  uid: string | null;
  email: string| null,
  name: string| null,
}

export const handleAddWishlist = async ({title, image, price, pathname, uid}:TWishlist) => {
    
    try {
      let result = await fetch('http://localhost:5000/add-wishlist', {
        method: 'post',
        body: JSON.stringify({ title, image, price, pathname, uid }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      result = await result.json();
      console.warn(result);
      if (result) {
        console.log('Data saved successfully');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
};

  export const handleAddUserToMongo = async ({email, name, uid}:TUserToMongo) => {
    try {
      const result = await fetch('http://localhost:5000/user', {
        method: 'POST',
        body: JSON.stringify({ email, name, uid }), // Correct payload structure
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const response = await result.json();
      console.warn(response);
  
      if (result.ok) {
        console.log('Data saved successfully');
      } else {
        console.error('Error saving data:', response.error);
      }
    } catch (error:any) {
      console.error('Error saving data:', error);
    }
  };


  export const InfoAccountFunc = async (uid:string | null) => {
    try {
      const result = await fetch(`http://localhost:5000/info-account/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Parse the response JSON
      const response = await result.json();
  
      if (result.ok) {
        console.log('Data fetched successfully:', response); // Log the fetched data
        return response; // Return the fetched data if needed
      } else {
        console.error('Error fetching data:', response); // Log the error response from the server
        throw new Error(response.message || 'Failed to fetch data'); // Throw a meaningful error
      }
    } catch (error:any) {
      console.error('Error fetching data:', error.message); // Log the error message
      throw error; // Rethrow the error so the caller can handle it
    }
  };

  export const OrderFunc = async (uid:string | null) => {
    try {
      const result = await fetch(`http://localhost:5000/check-out/${uid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Parse the response JSON
      const response = await result.json();
  
      if (result.ok) {
        console.log('Data fetched successfully:', response); // Log the fetched data
        return response; // Return the fetched data if needed
      } else {
        console.error('Error fetching data:', response); // Log the error response from the server
        throw new Error(response.message || 'Failed to fetch data'); // Throw a meaningful error
      }
    } catch (error:any) {
      console.error('Error fetching data:', error.message); // Log the error message
      throw error; // Rethrow the error so the caller can handle it
    }
  };



