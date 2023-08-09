import { auth, db } from '../config/firebase';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { childrenProps } from '../types/children'
import { monthlyPaymentProps } from '../types/monthlyPayment'


const Api = {

    /* example: async (userUid: string) => {
        try {
            
            bloco de comando

        } catch (error) {
            console.error('Erro: ', error);
            tratativas
        }
    } */

    /* 
        const studentRef = db.collection('tuition').doc('2023').collection('5').doc('idAluno');
        studentRef.get().then((doc) => {
            if (doc.exists) {
            setStudentData(doc.data());
            } else {
            console.log('No such document!');
            }
        }).catch((error) => {
            console.log('Error getting document:', error);
        }); 
      */

    getGeneralInformationChildren: async (tokens: string[]) => {
        try {
            const children: childrenProps[] = [];

            await Promise.all(tokens.map(async (item) => {
                const childrenRef = doc(db, "children", item);
                const childrenSnapshot = await getDoc(childrenRef);
                const childrenSnapshotData = childrenSnapshot.data();
                if (childrenSnapshotData) {
                    let timestamp = childrenSnapshotData.birth
                    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    childrenSnapshotData.birth = `${day}/${month}/${year}`
                    childrenSnapshotData.id = item
                    children.push(childrenSnapshotData as childrenProps);
                }
            }));
            return children;
        } catch (error) {
            console.error('Erro: ', error);
            return [];
        }
    },

    getMonthlyPaymentChildren: async (children: childrenProps[]) => {
        try {
            const monthlyPayment: monthlyPaymentProps[] = [];

            const year = new Date().getFullYear();
            await Promise.all(children.map(async (item) => {
                //const studentRef = db.collection('tuition').doc(year).collection(item.grade).doc(item.id);
                const monthCollectionRef = collection(
                    db,                   // Your 'db' instance from the config
                    `tuition/${year}/${item.grade}/${item.id}/month`  // Path to the subcollection
                );

                const querySnapshot = await getDocs(monthCollectionRef);

                querySnapshot.forEach((doc) => {
                    const studentData = doc.data();
                    //console.log('Student Data:', studentData);
                    if (studentData) {
                        if (studentData.maturity) {
                            let timestamp = studentData.maturity
                            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = date.getFullYear();
                            studentData.maturity = `${day}/${month}/${year}`
                        }
                        if (studentData.pay_day) {
                            let timestamp = studentData.pay_day
                            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const year = date.getFullYear();
                            studentData.pay_day = `${day}/${month}/${year}`
                        }else{
                            studentData.pay_day = 'Indisponível'
                        }
                        monthlyPayment.push(studentData as monthlyPaymentProps);
                    }
                });
            }));
            return monthlyPayment
        } catch (error) {
            console.error('Erro: ', error);
        }
    }

}


export default () => Api
