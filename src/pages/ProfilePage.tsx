import React, {useState, useEffect} from 'react'
import '../css/profilepage.css'

import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'

import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { collection, getDocs, addDoc, onSnapshot, query, where, doc } from 'firebase/firestore'
import db from '../firebase'
import {loadStripe} from '@stripe/stripe-js'

import {motion} from 'framer-motion'

const ProfilePage: React.FC = (): JSX.Element => {
    const user = useSelector(selectUser)

    const [error, setError] = useState<string>('')
    const [products, setProducts] = useState<any>([])
    const [subscription, setSubscription] = useState<any>('None')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const productQuery = query(collection(db, "products"), where("active", "==", true));

    useEffect(() => {
        const subscriptionQuery = query(collection(db, `customers/${user.uid}/subscriptions`))
        const fetchSubscription = async () => {
            await getDocs(subscriptionQuery)
                .then((querySnapshot) => {
                    querySnapshot.forEach(async (subscription) => {
                        setSubscription({
                            role: subscription.data().role,
                            current_period_end: subscription.data().current_period_end.seconds,
                            current_period_start: subscription.data().current_period_start.seconds
                        })
                    })
                })
        }
        fetchSubscription()
    }, [user.uid])

    useEffect(() => {
        const fetchPost = async () => {
            await getDocs(productQuery)
                .then((querySnapshot) => {
                    const totalProducts: any = {}              
                    querySnapshot.docs
                        .forEach(async (doc: any) => {
                            totalProducts[doc.id] = doc.data()
                            const priceQuery = query(collection(db, `products/${doc.id}/prices`))
                            await getDocs(priceQuery)
                                .then((querySnapshot) => {
                                    querySnapshot.forEach((price) => {
                                        totalProducts[doc.id].prices = {
                                            priceID: price.id,
                                            priceData: price.data()
                                        }
                                    })
                                })
                        })           
                    setProducts(totalProducts)
                })
        }
       fetchPost()
    }, [])

    const loadCheckout = async (priceId: any) => {
        const docRef = doc(db, "customers", user.uid)
        const colRef = collection(docRef, 'checkout_sessions')
        const idRef = await addDoc(colRef, {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        })

        onSnapshot(idRef, async (snap) => {
            const { error, sessionId }: any = snap.data()
            if(error) {
                setError(error.message)
            }
            if(sessionId) {
                const stripe = await loadStripe('pk_test_51NQq8iDcKHf1OKar8xq1OvSu5Q7JNJUMkjV6e6Yg8jEeQHhe1jb5nzsR5si89Pzrs6ILQGNVAQt8JZY1JOJk3UQN00mzRD7woD')
                stripe?.redirectToCheckout({sessionId})
            }
        })
    }

    const productArray = Object.values(products)
    const displayPlans = productArray.map((product: any) => {

        const isCurrentPackage = 
            product.name?.includes(subscription?.role)

        return (
            <div className = "flex justify-between w-full items-center">
                <div className = "LEFT-BOX flex flex-col">
                    <h1 className='text-white text-lg md:text-2xl font-bold'> 
                    {
                        product.name === 'Basic Plan' ? 'Amber Basic' :
                        product.name === 'Standard Plan' ? 'Amber Standard' :
                        product.name === 'Premium Plan' ? 'Amber Premium' : 
                        ('')
                    } 
                     </h1>
                    <h1 className='text-white text-lg'> 
                    {
                        product.name === 'Basic Plan' ? '720p' :
                        product.name === 'Standard Plan' ? '1080p' :
                        product.name === 'Premium Plan' ? '4K HDR' : 
                        ('')
                    } 
                    </h1>
                </div>

                <button 
                    onClick = {() => {
                        if(!isCurrentPackage) {
                            loadCheckout(product.prices.priceID)
                            setIsLoading(true)
                        } 
                    }}
                    className ={ ` ${!isCurrentPackage ? 'bg-amber-orange get-started-button' : 'bg-gray-500'} select-none p-3 text-white font-bold text-sm md:text-xl rounded-md cursor-pointer`}
                >
                    { isCurrentPackage ? 'Current Plan': 'Subscribe' }
                </button>
            </div>
        )
    })


    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Sign Out: Success')
            })
            .catch((error: any) => {
                setError(error.message)
            })
    }

    let renewalDate = new Date(subscription?.current_period_end * 1000).toLocaleDateString()

    if(renewalDate === "Invalid Date")    
        renewalDate = 'No Plan Active'

    return (
        <>
            <motion.div 
                initial = {{y: -500, opacity: 0}}
                animate = {{y: 0, opacity: 1}} 
                transition = {{ease: "easeOut", duration: 1}}
                className = "md:mt-[9rem] mt-[8rem] mb-[7rem] w-full max-w-[60rem] flex flex-col items-center justify-center font-[Poppins]"
            >
                <div className = "flex w-[80%]">
                    <div>
                        <img 
                            src="amber_avatar.png" 
                            alt="amber_avatar" 
                            className = "h-[5rem] select-none"
                            draggable = "false"
                        />
                    </div>

                    <div className = "ml-5">
                        <img 
                            src="amber_logo_full.png" 
                            alt = "Amber Logo" 
                            draggable = "false" 
                            className = "select-none object-contain h-[1.5rem]"
                        />
                        <h1 className = "text-white font-bold text-lg  md:text-2xl">Welcome!</h1>
                        <h1 className = "text-gray-300 text-lg md:text-xl">{user.email}</h1>
                    </div>
                </div>
                
                <div className = "plans_container flex flex-col w-[80%] mt-5">
                    {subscription ? <h1 className = "text-white font-bold text-lg md:text-2xl">
                            Your Subscription Plan <br/> <span className = "font-normal text-amber-orange">
                                {subscription.role ? subscription.role : 'No Plan Active'}
                            </span>
                    </h1> : ('')}

                    <hr className = "w-full my-5 opacity-30"/>

                    {subscription ? <h1 className = "text-white font-bold text-lg md:text-2xl">
                            Renewal Date <br/> <span className = "font-normal text-amber-orange">
                                {renewalDate}
                            </span>
                    </h1>: ('')}

                    <hr className = "w-full my-5 opacity-30"/>

                    <div className = "display-plans-container flex flex-col w-full mt-5 gap-[2rem]">
                        {displayPlans}
                    </div>

                    <hr className = "w-full my-5 opacity-30"/>

                </div>
                {isLoading ? (
                    <div>
                        <h1 className = "text-white font-[Poppins] font-bold">Processing...</h1>
                    </div>
                ) : 
                ('')}
                <button 
                    onClick = {handleSignOut}
                    className = "get-started-button select-none w-[80%] bg-amber-orange p-3 text-white font-bold text-sm md:text-xl rounded-md mt-5 cursor-pointer"
                >
                    Sign Out
                </button>
                <p className = "text-red-500 font-[Poppins]">
                    {error}
                </p> 
            </motion.div>
        </>
    )
}

export default ProfilePage