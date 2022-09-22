import React, { useEffect,Fragment } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import CertificateFragment from "./CertificateFragment";
import UtilityMethods from "../UtilityMethods";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  titleContainer:{
    flexDirection: 'row',
    marginTop: 24,
},
reportTitle:{
    color: '#1189a1',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
},
invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end'
},
invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
},
invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
        width:60
        
},
label: {
    
    textAlign:"right",
    marginRight:'3px'
}
});

const Certificate = ({booking}) => {
  let user = {"Name":booking.user.name ,"Gender":booking.user.gender,"Email":booking.user.email,"Contact":booking.user.phoneNumber,"Birth Date":booking.user.birthDate,"Age":UtilityMethods.calculateAge(booking.user.birthDate)}
  let userKeys=[["Name","Gender"],["Email","Contact"],["Birth Date","Age"]];  
  let hospital = {"Hospital Name":booking.hospital.name , "Address":booking.hospital.address,"Contact":booking.hospital.phoneNumber}
  let hospitalKeys=[["Hospital Name","Address","Contact"]]
  let vaccine = {"Vaccine Name":booking.vaccine.name,"Ideal Age":UtilityMethods.getAgeString(booking.vaccine.minAge , booking.vaccine.maxAge),"Ideal Gender":UtilityMethods.getGenderString(booking.vaccine.gender),"Disease":booking.vaccine.disease}
  let vaccineKeys=[["Vaccine Name","Ideal Age"],["Ideal Gender","Disease"]]
//   useEffect(() => {
    
//   }, [])
    
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>{booking.user.name}</Text>
        </View>
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Booking No : </Text>
                <Text style={styles.invoiceDate}>{booking.id}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Booking Date: </Text>
                <Text style={styles.invoiceDate}>{booking.date}</Text>
            </View >
        </Fragment>
        <CertificateFragment title={"Beneficiary Details"} data={user} keys={userKeys}/>
        <CertificateFragment title={"Hospital Details"} data={hospital} keys={hospitalKeys} />
        <CertificateFragment title={"Vaccine Details"} data={vaccine} keys={vaccineKeys} />
      </Page>
    </Document>
  );
};

export default Certificate;
