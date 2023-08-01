import { auth, db } from '../config/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { childrenProps } from '../types/children'


const Api = {

    /* example: async (userUid: string) => {
        try {
            
            bloco de comando

        } catch (error) {
            console.error('Erro: ', error);
            tratativas
        }
    } */
    getGeneralInformationChildren: async (tokens: string[]) => {
        console.log('tokens: ', tokens);
        try {
            const children: childrenProps[] = [];

            await Promise.all(tokens.map(async (item) => {
                const childrenRef = doc(db, "children", item);
                const childrenSnapshot = await getDoc(childrenRef);
                const childrenSnapshotData = childrenSnapshot.data();
                if (childrenSnapshotData) {
                    console.log(childrenSnapshotData.birth)

                    let timestamp = childrenSnapshotData.birth
                    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    console.log(`${day}/${month}/${year}`)
                    childrenSnapshotData.birth = `${day}/${month}/${year}`


                    children.push(childrenSnapshotData as childrenProps);
                }
            }));

            return children;
        } catch (error) {
            console.error('Erro: ', error);
            return []; // Retorne um array vazio em caso de erro
        }
    }

}


export default () => Api
