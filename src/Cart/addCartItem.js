import { collection, addDoc } from 'firebase/firestore';
import { db } from '../component/firebase';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const addCartItem = async (item,type_id) => {
  // Read the user ID from the cookie and convert it to a number
  const userIdString = Cookies.get('myKey');
  if (!userIdString) {
    toast.error('User ID not found');
    return;
  }

  const userId = userIdString;
 

  try {
    const itemWithUserId = {
      ...item,
      user_id: userId,
      type_id:type_id
    };

    // Add item to the carts collection with an auto-generated ID
    const docRef = await addDoc(collection(db, 'carts'), itemWithUserId);

    console.log('Document written with ID: ', docRef.id);
    toast.success('Item added to cart');
  } catch (e) {
    console.error('Error adding item to cart: ', e);
    toast.error('Error adding item to cart');
  }
};

export default addCartItem;
