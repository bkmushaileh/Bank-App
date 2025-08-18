import { UserProfile } from "@/data/userInfo";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import {profile }from "@/api/auth"
// me
const ProfileScreen =() =>{
    const [profileData, setProfileData] = useState<UserProfile> ({
         username: "",
        image: "",
        balance: 0 
           } );
    const [loading,setLoading] = useState(true);

useEffect(()=>{
    const fetchProfile = async () =>{
    try {
        const data = await profile(userInfo);
        setProfileData(data);
    } catch (error) {
        console.error("ERRORR PROFIILLEE", error); 
    } finally {
        setLoading(false);
    }
};
fetchProfile();
},[]);
};

return (

<View style={styles.container}>
    {loading? (
<ActivityIndicator size="large" color="#00ff59ff"/>
) :profileData ? (
    <>
<Image source={{ uri: profileData.image}} style={styles.image}/>
<Text style={styles.username}> {profileData.username}</Text>
<Text style={styles.balance}> Balance:${profileData.balance ?? 0}</Text>
</>
) : ( <Text>ERROR: no data</Text>)
}
</View>
);
};




export default ProfileScreen;


const styles = StyleSheet.create({
container:{
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent:"center",
    padding: 20,
},
image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 2,
    borderColor:"green",
},
username:{
fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  balance: {
    fontSize: 18,
    color: "#4CAF50",
  },
});


