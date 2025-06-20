"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Palette, Shield, Save, Camera } from "lucide-react"

export default function Parametres() {
  const [profile, setProfile] = useState({
    nom: "Jean Dupont",
    email: "j.dupont@delpson.fr",
    telephone: "01 23 45 67 89",
    poste: "Technicien Senior",
    entreprise: "Delpson",
  })

  const [preferences, setPreferences] = useState({
    theme: "light",
    langue: "fr",
    notifications: {
      email: true,
      push: true,
      nouveauChantier: true,
      devisAccepte: true,
      rappelRdv: true,
      factureEnRetard: false,
    },
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }))
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
          <p className="text-gray-600 dark:text-gray-400">Personnalisez votre expérience Delpson</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil utilisateur */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profil utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <div>
                <Button variant="outline" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <Camera className="w-4 h-4 mr-2" />
                  Changer la photo
                </Button>
                <p className="text-sm text-gray-500 mt-2">JPG, PNG ou GIF. Max 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom complet</Label>
                <Input id="nom" value={profile.nom} onChange={(e) => handleProfileChange("nom", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  value={profile.telephone}
                  onChange={(e) => handleProfileChange("telephone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="poste">Poste</Label>
                <Input
                  id="poste"
                  value={profile.poste}
                  onChange={(e) => handleProfileChange("poste", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="entreprise">Entreprise</Label>
                <Input
                  id="entreprise"
                  value={profile.entreprise}
                  onChange={(e) => handleProfileChange("entreprise", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Préférences d'affichage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Affichage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Thème</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, theme: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="system">Système</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Langue</Label>
              <Select
                value={preferences.langue}
                onValueChange={(value) => setPreferences((prev) => ({ ...prev, langue: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Canaux de notification</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notif">Notifications par email</Label>
                  <Switch
                    id="email-notif"
                    checked={preferences.notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notif">Notifications push</Label>
                  <Switch
                    id="push-notif"
                    checked={preferences.notifications.push}
                    onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Types de notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="nouveau-chantier">Nouveau chantier</Label>
                  <Switch
                    id="nouveau-chantier"
                    checked={preferences.notifications.nouveauChantier}
                    onCheckedChange={(checked) => handleNotificationChange("nouveauChantier", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="devis-accepte">Devis accepté</Label>
                  <Switch
                    id="devis-accepte"
                    checked={preferences.notifications.devisAccepte}
                    onCheckedChange={(checked) => handleNotificationChange("devisAccepte", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="rappel-rdv">Rappel rendez-vous</Label>
                  <Switch
                    id="rappel-rdv"
                    checked={preferences.notifications.rappelRdv}
                    onCheckedChange={(checked) => handleNotificationChange("rappelRdv", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="facture-retard">Facture en retard</Label>
                  <Switch
                    id="facture-retard"
                    checked={preferences.notifications.factureEnRetard}
                    onCheckedChange={(checked) => handleNotificationChange("factureEnRetard", checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sécurité */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Changer le mot de passe</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Dernière modification il y a 3 mois</p>
            </div>
            <Button variant="outline" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              Modifier
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Authentification à deux facteurs</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sécurisez votre compte avec la 2FA</p>
            </div>
            <Button variant="outline" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              Configurer
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Sessions actives</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gérez vos sessions de connexion</p>
            </div>
            <Button variant="outline" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              Voir tout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Zone dangereuse */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Zone dangereuse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Exporter mes données</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Téléchargez toutes vos données au format JSON</p>
            </div>
            <Button variant="outline" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              Exporter
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-600 dark:text-red-400">Supprimer le compte</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cette action est irréversible</p>
            </div>
            <Button variant="destructive">Supprimer</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
