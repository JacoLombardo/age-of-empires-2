// 1. Import hook
import { createContext, useContext } from "react";
import { db } from "../config";
import { deleteDoc, doc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

// 2. Create Context / Store

export const FavouriteContext = createContext();

// 3. Create provider
export const FavouriteContextProvider = (props) => {

  const { user } = useContext(AuthContext);

  const addFavourite = async ( unit, civilization, structure, technology ) => {

    console.log("unit", unit)
    console.log("civilization", civilization)
    console.log("structure", structure)
    console.log("technology", technology)

    // let field = ""
    // let data = ""

    // if (unit) {
    //   data = unit
    //   field = "Units"
    //   console.log("Units")
    // } if (civilization) {
    //   data = civilization
    //   field = "Civilizations"
    //   console.log("Civilizations")
    // } if (structure) {
    //   data = structure
    //   field = "Structures"
    //   console.log("Structures")
    // } if (technology) {
    //   data = technology
    //   field = "Technologies"
    //   console.log("Technologies")
    // } try {
    //       await setDoc(doc(db, "Favourites", `${user.email}`, `${field}`, `${data.id}`), {
    //         name: data.name,
    //         id: data.id,
    //       });
    //       console.log(data.name + " added to favourites!")
    //     } catch (e) {
    //       console.error("Error adding document: ", e);
    //     }

      // if (unit) {
      //   try {
      //     await setDoc(doc(db, "Favourites", `${user.email}`, "Units", `${unit.id}`), {
      //       name: unit.name,
      //       id: unit.id,
      //     });
      //     console.log(unit.name + " added to favourites!")
      //   } catch (e) {
      //     console.error("Error adding document: ", e);
      //   }
      // } if (civilization) {
      //   try {
      //     await setDoc(doc(db, "Favourites", `${user.email}`, "Civilizations", `${civilization.id}`), {
      //     name: civilization.name,
      //     id: civilization.id,
      //     });
      //     console.log(civilization.name + " added to favourites!")
      //   } catch (e) {
      //     console.error("Error adding document: ", e);
      //   }
      // } if (technology) {
      //   try {
      //     await setDoc(doc(db, "Favourites", `${user.email}`, "Technologies", `${technology.id}`), {
      //     name: technology.name,
      //     id: technology.id,
      //     });
      //     console.log(technology.name + " added to favourites!")
      //   } catch (e) {
      //     console.error("Error adding document: ", e);
      //   }
      // } if (structure) {
      //   try {
      //     await setDoc(doc(db, "Favourites", `${user.email}`, "Structures", `${structure.id}`), {
      //     name: structure.name,
      //     id: structure.id,
      //     });
      //     console.log(structure.name + " added to favourites!")
      //   } catch (e) {
      //     console.error("Error adding document: ", e);
      //   }
      // }
  };

  const removeFavourite = async (unit, civilization, structure, technology) => {

    let field = ""
    let data = ""

    if (unit) {
      data = unit
      field = "Units"
    } if (civilization) {
      data = civilization
      field = "Civilizations"
    } if (structure) {
      data = structure
      field = "Structures"
    } if (technology) {
      data = technology
      field = "Technologies"
    } try {
      await deleteDoc(doc(db, "Favourites", `${user.email}`, `${field}`, `${data.id}`));
      console.log(data.name + " removed from favourites!")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }


  // 4. Move state and function

  return (
    <FavouriteContext.Provider value={{ addFavourite, removeFavourite, importAll }}>{props.children}</FavouriteContext.Provider>
  );
};
