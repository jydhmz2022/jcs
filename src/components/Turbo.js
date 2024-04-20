import React, { useState, useEffect } from 'react';
import '../firebase-config';
import "./styles/turbo.css"
import { getFirestore, addDoc, collection, query, where, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';

const TripForm = () => {
    const handleLogout = () => {
        // Code pour la déconnexion
    }; 


    const [driverName, setDriverName] = useState('');
    const [clientName, setClientName] = useState('');
    const [driverId, setDriverId] = useState('');
    const [clientId, setClientId] = useState('');
    const [driverNumber, setDriverNumber] = useState('');
    const [clientNumber, setClientNumber] = useState('');
    const [clientTrips, setClientTrips] = useState([]);
    const [driverTrips, setDriverTrips] = useState([]);
    const [clientTripCount, setClientTripCount] = useState(0);
    const [driverTripCount, setDriverTripCount] = useState(0);
    const [totalClientAmount, setTotalClientAmount] = useState(0);
    const [totalDriverAmount, setTotalDriverAmount] = useState(0);
    const [amount, setAmount] = useState(1000);

    const db = getFirestore();
    const currentDate = new Date();
   

    useEffect(() => {
        
        const fetchClientTripCount = async () => {
            try {
                const clientQuery = query(collection(db, 'clients'), where('number', '==', clientNumber));
                const clientQuerySnapshot = await getDocs(clientQuery);
                if (!clientQuerySnapshot.empty) {
                    clientQuerySnapshot.forEach((doc) => {
                        setClientTripCount(doc.data().trips.length);
                    });
                }
                
            } catch (error) {
                console.error('Error fetching client trips: ', error);
            }
        };

        fetchClientTripCount();
    }, [clientNumber, db]);

    useEffect(() => {
        const fetchDriverTripCount = async () => {
            try {
                const driverQuery = query(collection(db, 'drivers'), where('number', '==', driverNumber));
                const driverQuerySnapshot = await getDocs(driverQuery);
                if (!driverQuerySnapshot.empty) {
                    driverQuerySnapshot.forEach((doc) => {
                        setDriverTripCount(doc.data().trips.length);
                    });
                }
            } catch (error) {
                console.error('Error fetching driver trips: ', error);
            }
        };

        fetchDriverTripCount();
    }, [driverNumber, db]);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const clientQuery = query(collection(db, 'clients'), where('number', '==', clientNumber));
                const clientQuerySnapshot = await getDocs(clientQuery);
                if (!clientQuerySnapshot.empty) {
                    clientQuerySnapshot.forEach((doc) => {
                        const clientData = doc.data();
                        setClientName(clientData.name);
                        setClientTripCount(clientData.trips.length);
                        let totalAmount = 0;
                        clientData.trips.forEach(trip => {
                            totalAmount += trip.amount || 0;
                        });
                        setTotalClientAmount(totalAmount);
                    });
                } else {
                    setClientName('');
                    setClientTripCount(0);
                    setTotalClientAmount(0);
                }
            } catch (error) {
                console.error('Error fetching client data: ', error);
            }
        };

        fetchClientData();
    }, [clientNumber, db]);

    useEffect(() => {
        const fetchDriverData = async () => {
            try {
                const driverQuery = query(collection(db, 'drivers'), where('number', '==', driverNumber));
                const driverQuerySnapshot = await getDocs(driverQuery);
                if (!driverQuerySnapshot.empty) {
                    driverQuerySnapshot.forEach((doc) => {
                        const driverData = doc.data();
                        setDriverName(driverData.name);
                        setDriverTripCount(driverData.trips.length);
                        let totalAmount = 0;
                        driverData.trips.forEach(trip => {
                            totalAmount += trip.amount || 0;
                        });
                        setTotalDriverAmount(totalAmount);
                    });
                } else {
                    setDriverName('');
                    setDriverTripCount(0);
                    setTotalDriverAmount(0);
                }
            } catch (error) {
                console.error('Error fetching driver data: ', error);
            }
        };

        fetchDriverData();
    }, [driverNumber, db]);

    const handleDriverSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Vérifier si le conducteur existe déjà avec le numéro de téléphone
            const driverQuery = query(collection(db, 'drivers'), where('number', '==', driverNumber));
            const driverQuerySnapshot = await getDocs(driverQuery);
    
            if (!driverQuerySnapshot.empty) {
                // Le conducteur existe déjà
                driverQuerySnapshot.forEach((doc) => {
                    const driverId = doc.id;
                    setDriverId(driverId);
                    const driverData = doc.data();
                    
                    const newTrip = {
                        clientName,
                        clientNumber,
                        amount: parseFloat(amount),
                        createdAt: currentDate
                    };
    
                    setDriverTrips([...driverTrips, newTrip]);
                    const updatedDriverTrips = [...driverData.trips, newTrip];
    
                    // Mettre à jour le document du conducteur avec la nouvelle liste de courses
                    updateDoc(doc.ref, {
                        trips: updatedDriverTrips
                    });
                });
            } else {
                // Créer un document pour le conducteur s'il n'existe pas
                const driverDocRef = await addDoc(collection(db, 'drivers'),  {
                    name: driverName,
                    number: driverNumber,
                    trips: [{
                        clientName,
                        clientNumber,
                        amount: parseFloat(amount),
                        createdAt: currentDate
                    }]
                });
                setDriverId(driverDocRef.id)
            }
    
            setClientNumber('');
            setClientName('');
            setAmount(1000); 
            setDriverNumber('');
            setDriverName('');
            console.log('Trip added successfully!');
            return true;
        } catch (error) {
            console.error('Error adding trip: ', error);
            return false;
        }
    };
    
    

    const handleClientSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const clientQuery = query(collection(db, 'clients'), where('number', '==', clientNumber));
            const clientQuerySnapshot = await getDocs(clientQuery);
    
            if (!clientQuerySnapshot.empty) {
                // Le conducteur existe déjà
                clientQuerySnapshot.forEach((doc) => {
                    const clientId = doc.id;
                    setClientId(clientId)
                    const clientData = doc.data();
                    
                    const newTrip = {
                        driverName,
                        driverNumber,
                        amount: parseFloat(amount),
                        createdAt: currentDate
                    };
    
                    setClientTrips([...clientTrips, newTrip]);
                   
                    const updatedClientTrips = [...clientData.trips, newTrip];
    
                    updateDoc(doc.ref, {
                        trips: updatedClientTrips
                    });
                });
            } else {
               
                const clientDocRef = await addDoc(collection(db, 'clients'),  {
                    name: clientName,
                    number: clientNumber,
                    trips: [{
                        driverName,
                        driverNumber,
                        amount: parseFloat(amount),
                        createdAt: currentDate
                    }]
                });
                setClientId(clientDocRef.id)
            }
            setClientNumber('');
            setClientName('');
            setAmount(1000); 
            setDriverNumber('');
            setDriverName('');
    
            console.log('Trip added successfully!');
            return true;
        } catch (error) {
            console.error('Error adding trip: ', error);

            return false;
        }
    };

    const handleSubmit = async (e) => {
      
        e.preventDefault();
        console.log('driverName:', driverName);
        console.log('clientName:', clientName);
        console.log(driverTripCount, clientTripCount)
        console.log("les id", driverId, clientId)
    
        try {
            const driverSubmitResult = await handleDriverSubmit(e);
            const clientSubmitResult = await handleClientSubmit(e);

            console.log(driverSubmitResult, clientSubmitResult)
    
            // Vérifiez si les soumissions de conducteur et de client sont réussies avant de procéder
            if (driverSubmitResult && clientSubmitResult) {
                setClientId(clientId)
                setDriverId(driverId)
                console.log('driverId:', driverId);
                console.log('clientId:', clientId);
    
                if (driverId && clientId) {
                    console.log('Both driverId and clientId are not empty. Proceeding with trip addition.');
    
                    // Obtenir les références de document complètes pour driverId et clientId
                    const driverDocRef = doc(db, 'drivers', driverId);
                    const clientDocRef = doc(db, 'clients', clientId);
    
                    // Ajouter la nouvelle course à la liste des anciennes courses du client
                    const updatedTrips = [...clientTrips, {
                        driverName,
                        driverNumber,
                        amount: parseFloat(amount),
                        createdAt: currentDate
                    }];
    
                    // Mettre à jour le document du client avec la nouvelle liste de courses
                    await updateDoc(clientDocRef, {
                        trips: updatedTrips
                    });
    
                    setClientTrips(updatedTrips);
    
                    setClientTripCount(updatedTrips.length);
    
                    // Faire de même pour les conducteurs
                    const updatedDriverTrips = [...driverTrips, {
                        clientName,
                        clientNumber,
                        amount: parseFloat(amount),
                        createdAt: currentDate
                        // Autres informations sur la course
                    }];
    
                    await updateDoc(driverDocRef, {
                        trips: updatedDriverTrips
                    });
    
                    // Mettre à jour driverTrips
                    setDriverTrips(updatedDriverTrips);
    
                    // Mettre à jour le nombre de courses du conducteur
                    setDriverTripCount(updatedDriverTrips.length);
    
                    alert('Course ajouté avec succès !');
                } else {
                    console.error('Error adding trip: driverId or clientId is empty');
                    alert('Erreur Veuillez réessayer plus tard.');
                }
            } else {
                console.error('Error adding trip: driver or client submission failed');
                alert('Une erreur lors de l ajout. Veuillez réessayer plus tard.');
            }
        } catch (error) {
            console.error('Error adding trip: ', error);
            alert('Une erreur lors de l ajout. Veuillez réessayer plus tard.');
        }
    };
    
    
    
    
    
  

    return (
        <div>
            <button onClick={handleLogout} className="logout-button">Déconnexion</button>
       
        <div className="container">
            <h2>Gestion Turbo</h2>
            <form onSubmit={handleSubmit}>
            <div>
                    <h3>Client</h3>
                    <label>Téléphone du Client</label>
                    <input type="tel" value={clientNumber} onChange={(e) => setClientNumber(e.target.value)} required />
                    <label>Nom du client</label>
                    <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
                    <div>
                <label>Montant</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <p>{clientTripCount} Courses</p>
                <p>Total MRU : {totalClientAmount}</p>
                   
                </div>
                <div className="section-divider"></div>
                <div>
                    <h3>Chauffer</h3>
                    <label>Téléphone du Chauffer</label>
                    <input type="tel" value={driverNumber} onChange={(e) => setDriverNumber(e.target.value)} required />
                    <label>Nom du conducteur:</label>
                    <input type="text" value={driverName} onChange={(e) => setDriverName(e.target.value)} required />  
                </div>
                <button type="submit">Créer la course</button>
                
                <p>{driverTripCount} Courses</p>
                <p>Total MRU : {totalDriverAmount}</p>
            </form>
        </div>
        </div>
    );
};

export default TripForm;
