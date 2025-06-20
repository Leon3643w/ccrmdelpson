"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertCircle, Info, Clock, Trash2, BookMarkedIcon as MarkAsRead } from "lucide-react"

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      titre: "Devis accepté",
      message: "Le devis #DEV-2024-001 pour Entreprise Dupont a été accepté",
      date: "2024-01-15T10:30:00",
      lu: false,
      action: "Créer le chantier",
    },
    {
      id: 2,
      type: "info",
      titre: "Nouveau chantier planifié",
      message: "Le chantier CH-2024-002 est planifié pour demain à 09h00",
      date: "2024-01-15T08:15:00",
      lu: false,
      action: "Voir les détails",
    },
    {
      id: 3,
      type: "warning",
      titre: "Relance client nécessaire",
      message: "Le devis #DEV-2024-002 pour Clinique Saint-Jean expire dans 3 jours",
      date: "2024-01-14T16:45:00",
      lu: true,
      action: "Relancer le client",
    },
    {
      id: 4,
      type: "urgent",
      titre: "Facture en retard",
      message: "La facture #FAC-2024-002 de SAS Lefebvre est en retard de paiement",
      date: "2024-01-14T14:20:00",
      lu: false,
      action: "Contacter le client",
    },
    {
      id: 5,
      type: "info",
      titre: "Maintenance programmée",
      message: "Maintenance préventive prévue chez Hotel Bellevue demain",
      date: "2024-01-14T09:00:00",
      lu: true,
      action: "Voir l'agenda",
    },
    {
      id: 6,
      type: "success",
      titre: "Chantier terminé",
      message: "Le chantier CH-2023-045 chez SARL Martin a été marqué comme terminé",
      date: "2024-01-13T17:30:00",
      lu: true,
      action: "Créer la facture",
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      case "urgent":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50 dark:bg-green-900/20"
      case "warning":
        return "border-l-orange-500 bg-orange-50 dark:bg-orange-900/20"
      case "urgent":
        return "border-l-red-500 bg-red-50 dark:bg-red-900/20"
      case "info":
        return "border-l-blue-500 bg-blue-50 dark:bg-blue-900/20"
      default:
        return "border-l-gray-500 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "À l'instant"
    if (diffInHours < 24) return `Il y a ${diffInHours}h`
    if (diffInHours < 48) return "Hier"
    return date.toLocaleDateString("fr-FR")
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, lu: true } : notif)))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, lu: true })))
  }

  const unreadCount = notifications.filter((n) => !n.lu).length

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">Restez informé de l'activité de votre CRM</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <MarkAsRead className="w-4 h-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
          <Badge variant="secondary" className="px-3 py-1">
            {unreadCount} non lues
          </Badge>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{notifications.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total notifications</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Non lues</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {notifications.filter((n) => n.type === "urgent").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Urgentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {notifications.filter((n) => n.type === "success").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Succès</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des notifications */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`border-l-4 ${getNotificationColor(notification.type)} ${!notification.lu ? "shadow-md" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {getNotificationIcon(notification.type)}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-medium ${!notification.lu ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
                      >
                        {notification.titre}
                      </h4>
                      {!notification.lu && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{notification.message}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {formatDate(notification.date)}
                      </div>
                      {notification.action && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                        >
                          {notification.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!notification.lu && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => markAsRead(notification.id)}
                      title="Marquer comme lu"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteNotification(notification.id)}
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Bell className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune notification</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Vous êtes à jour ! Toutes vos notifications ont été traitées.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
