"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Card className="w-full max-w-md">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Вхід</TabsTrigger>
          <TabsTrigger value="register">Реєстрація</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthTabs;
