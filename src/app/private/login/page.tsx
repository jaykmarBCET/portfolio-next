'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfileStore } from '@/store/store'
import { User } from '@/types/types'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

function LoginPage() {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<User>({ name: "", password: "", email: '' })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { registerAndLogin,user,getUser } = useProfileStore()
  const router = useRouter()

  const handelUserLogin = async () => {
    setIsLoading(true)
    if(!registerAndLogin)return;
    await registerAndLogin(userInfo)
   
    setIsLoading(false)
  }
  useEffect(()=>{
    getUser()
  },[])
  useEffect(()=>{
    if(user && user.email){
      router.replace("/private")
    }
  },[user])
  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div layout> {/* Auto height animation */}
          <Card className="w-[350px] shadow-2xl rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden">
            <CardHeader>
              <motion.div
                key={isRegister ? "register" : "login"}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <CardTitle className="text-2xl font-extrabold italic text-center tracking-wide">
                  {isRegister ? "Register" : "Login"}
                </CardTitle>
              </motion.div>
            </CardHeader>

            {/* Animate form switching */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isRegister ? "register-form" : "login-form"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <CardContent className="flex flex-col gap-y-4 px-6 pb-4">
                  {isRegister && (
                    <Input
                      type="text"
                      value={userInfo.name}
                      onChange={(e)=>setUserInfo({...userInfo,name:e.target.value})}
                      placeholder="Enter Name"
                      className="bg-white/5 border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 transition-all"
                    />
                  )}
                  <Input
                    type="email"
                    value={userInfo.email}
                      onChange={(e)=>setUserInfo({...userInfo,email:e.target.value})}
                    placeholder="Enter Email"
                    className="bg-white/5 border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 transition-all"
                  />
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    value={userInfo.password}
                      onChange={(e)=>setUserInfo({...userInfo,password:e.target.value})}
                    className="bg-white/5 border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-400/50 transition-all"
                  />
                </CardContent>
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex flex-col gap-y-3 items-center px-6 pb-6">
              <motion.div whileTap={{ scale: 0.95 }} className="w-full">
                <Button
                  disabled={isLoading}
                  onClick={()=>handelUserLogin()}
                  className="w-full font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 
                             hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/30
                             transition-all duration-300 flex items-center justify-center"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isRegister ? "Register" : "Login")}
                </Button>
              </motion.div>

              <motion.p
                whileHover={{ scale: 1.05 }}
                className="text-blue-400 text-sm cursor-pointer hover:text-blue-500 transition-colors"
                onClick={() => setIsRegister((prev) => !prev)}
              >
                {isRegister ? "Already have an account?" : "Don't have an account?"}
              </motion.p>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage
