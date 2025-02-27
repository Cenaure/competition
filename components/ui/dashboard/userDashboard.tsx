"use client";

import type React from "react";

import { useActionState } from "react";
import { useTabAnimation } from "@/lib/useTabAnimation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Media, User } from "@/payload-types";
import {
  updateUser,
  changePassword,
} from "@/app/(client)/(main)/dashboard/actions/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

export function UserDashboard({ user }: { user: User }) {
  const [updateState, updateAction, updatePending] = useActionState(
    updateUser,
    { success: false },
  );
  const [changePasswordState, changePasswordAction, changePasswordPending] =
    useActionState(changePassword, { success: false });

  const profileCardRef = useTabAnimation();
  const securityCardRef = useTabAnimation();

  if (!user) return null;

  async function logout() {
    await fetch(`/api/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-10">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="profile">Профіль</TabsTrigger>
          <TabsTrigger value="security">Безпека</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card ref={profileCardRef}>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Профіль</CardTitle>
              <CardDescription>
                Керуйте своєю особистою інформацією
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={updateAction}>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Avatar className="h-20 w-20">
                      {(user.avatar as Media)?.url && (
                        <AvatarImage
                          src={(user.avatar as Media).url || ""}
                          alt={user.name || ""}
                        />
                      )}
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {/* <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Змінити фото профілю
                    </Button> */}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Ім{"'"}я</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={user.name || ""}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Пошта</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={user.email}
                    />
                  </div>
                </div>
                <CardFooter className="flex flex-col md:flex-row justify-between pt-6 px-0">
                  <div>
                    {(!updateState.success && updateState.error) ||
                    updateState.success ? (
                      <p
                        className={
                          updateState.success
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {updateState.error
                          ? updateState.error
                          : "Профіль оновлено успішно"}
                      </p>
                    ) : null}
                  </div>
                  <Button
                    type="submit"
                    disabled={updatePending}
                    className="w-full sm:w-auto"
                  >
                    {updatePending ? "Збереження..." : "Зберегти"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <div className="p-6 flex justify-between items-center">
              <div className="space-x-4">
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button>Панель адміністратора</Button>
                  </Link>
                )}

                <Button variant="outline" onClick={() => logout()}>
                  Вийти
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card ref={securityCardRef}>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Безпека</CardTitle>
              <CardDescription>Керуйте своєю безпекою</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={changePasswordAction}>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Поточний пароль</Label>
                    <Input
                      id="current-password"
                      name="currentPassword"
                      type="password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">Новий пароль</Label>
                    <Input
                      id="new-password"
                      name="newPassword"
                      type="password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">
                      Підтвердити новий пароль
                    </Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                    />
                  </div>
                </div>
                <CardFooter className="flex justify-between pt-6 px-0">
                  <div>
                    {(!changePasswordState.success &&
                      changePasswordState.error) ||
                    changePasswordState.success ? (
                      <p
                        className={
                          changePasswordState.success
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {changePasswordState.error
                          ? changePasswordState.error
                          : "Пароль змінено успішно"}
                      </p>
                    ) : null}
                  </div>
                  <Button
                    type="submit"
                    disabled={changePasswordPending}
                    className="w-full sm:w-auto"
                  >
                    {changePasswordPending ? "Змінюємо..." : "Змінити пароль"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
