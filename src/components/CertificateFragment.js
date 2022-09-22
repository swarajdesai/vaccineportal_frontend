import React, { useEffect } from "react";
import { Page, Document, View, Text, StyleSheet } from "@react-pdf/renderer";
function CertificateFragment({ data, title ,keys}) {
  useEffect(() => {
    
  console.log("data",data , keys);

    
  }, [])
    
  const styles = StyleSheet.create({
    mainView: {
      // borderTop: "1px solid black",
      // borderBottom: "1px solid black",
      padding: "5px 0 15px 0",
    },
    innerDataView: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    innerDataText: {
      width: "170px",
      textAlign: "left",
      display: "flex",
      flexDirection: "row",
      margin: "2px 0 2px 0",
    },
    header: {
      borderTop: "1px solid black",
      borderBottom: "1px solid black",
      textAlign: "center",
      fontWeight: "bolder",
      fontSize: 18,
      backgroundColor: "#1189a1",
      paddingTop: "2px",
    },
    innerDataTextLabel: {
      display: "inline-block",
      textAlign: "left",
      minWidth: "70px",
      marginLeft: "10px",
    },
    innerDataTextData: {
      display: "inline-block",
      textAlign: "left",
      color: "#1189a1",
    },
  });
  return (
    <>
    <View style={styles.mainView}>
          <View style={styles.header}>
            <Text>{title}</Text>
          </View>
          
      { keys.map(key => 
            <View style={styles.innerDataView}>
            
            
                {key.map(k=>
                    <View style={styles.innerDataText}>
                    <Text style={styles.innerDataTextLabel}>{k}</Text>
                    <Text>{" : "}</Text>
                    <Text style={styles.innerDataTextData}>{data[k]}</Text>  
                    </View>  
                )}
              
            
            
            
        {/* //   <View style={styles.innerDataView}>
        //     <View style={styles.innerDataText}>
        //       <Text style={styles.innerDataTextLabel}>Email</Text>
        //       <Text>{"  : "}</Text>
        //       <Text style={styles.innerDataTextData}>desaiswaraj12@gmail</Text>
        //     </View>
        //     <View style={styles.innerDataText}>
        //       <Text style={styles.innerDataTextLabel}>Contact</Text>
        //       <Text>{" : "}</Text>
        //       <Text style={styles.innerDataTextData}>8806566166</Text>
        //     </View>
        //   </View>
        //   <View style={styles.innerDataView}>
        //     <View style={styles.innerDataText}>
        //       <Text style={styles.innerDataTextLabel}>Birth Date</Text>
        //       <Text>{" : "}</Text>
        //       <Text style={styles.innerDataTextData}>27-01-1999</Text>
        //     </View>
        //     <View style={styles.innerDataText}>
        //       <Text style={styles.innerDataTextLabel}>Age</Text>
        //       <Text>{" : "}</Text>
        //       <Text style={styles.innerDataTextData}>32</Text>
        //     </View>
        //   </View> */}
        </View>
      )}
      
      </View>
    </>
  );
}

export default CertificateFragment;
