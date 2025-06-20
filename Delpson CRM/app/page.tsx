"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Calendar, AlertCircle, Users, FileText, Wrench, Target } from "lucide-react"

export default function Dashboard() {
  const [notifications] = useState([
    { id: 1, type: "urgent", message: "Devis #2024-001 accepté par SARL Martin", time: "2h" },
    { id: 2, type: "info", message: "Nouveau chantier planifié pour demain", time: "4h" },
    { id: 3, type: "warning", message: "Relance client Dupont & Fils", time: "1j" },
  ])

  const stats = [
    { title: "Chantiers en cours", value: "12", icon: Wrench, color: "text-blue-600" },
    { title: "Chantiers terminés", value: "45", icon: BarChart3, color: "text-green-600" },
    { title: "Opportunités ouvertes", value: "8", icon: Target, color: "text-orange-600" },
    { title: "Devis en attente", value: "5", icon: FileText, color: "text-purple-600" },
  ]

  const recentActivities = [
    { id: 1, action: "Chantier créé", client: "Entreprise Dubois", time: "10:30", status: "nouveau" },
    { id: 2, action: "Devis envoyé", client: "SARL Martin", time: "09:15", status: "envoyé" },
    { id: 3, action: "Chantier terminé", client: "SAS Lefebvre", time: "08:45", status: "terminé" },
  ]

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tableau de bord</h1>
          <p className="text-gray-600 dark:text-gray-400">Vue d'ensemble de votre activité</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-2" />
          Planifier un rendez-vous
        </Button>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique d'évolution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Évolution mensuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Graphique d'évolution des chantiers</p>
                <p className="text-sm text-gray-400">Données des 6 derniers mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications et rappels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    notif.type === "urgent" ? "bg-red-500" : notif.type === "warning" ? "bg-orange-500" : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{notif.message}</p>
                  <p className="text-xs text-gray-500">Il y a {notif.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              Voir toutes les notifications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Activités récentes */}
      <Card>
        <CardHeader>
          <CardTitle>Activités récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      activity.status === "nouveau" ? "default" : activity.status === "envoyé" ? "secondary" : "outline"
                    }
                  >
                    {activity.status}
                  </Badge>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
