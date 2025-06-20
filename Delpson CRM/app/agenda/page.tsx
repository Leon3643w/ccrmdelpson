"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, CalendarIcon, MapPin, User, ChevronLeft, ChevronRight } from "lucide-react"

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")

  const events = [
    {
      id: 1,
      titre: "Visite chantier - Entreprise Dupont",
      type: "chantier",
      date: "2024-01-15",
      heure: "09:00",
      duree: 120,
      lieu: "123 Rue de la Paix, Paris",
      client: "Entreprise Dupont",
      statut: "confirme",
    },
    {
      id: 2,
      titre: "Rendez-vous commercial - SARL Martin",
      type: "commercial",
      date: "2024-01-15",
      heure: "14:30",
      duree: 60,
      lieu: "456 Avenue des Champs, Lyon",
      client: "SARL Martin",
      statut: "confirme",
    },
    {
      id: 3,
      titre: "Maintenance préventive - Hotel Bellevue",
      type: "maintenance",
      date: "2024-01-16",
      heure: "08:00",
      duree: 180,
      lieu: "321 Promenade de la Mer, Nice",
      client: "Hotel Bellevue",
      statut: "planifie",
    },
    {
      id: 4,
      titre: "Relance devis - Clinique Saint-Jean",
      type: "relance",
      date: "2024-01-17",
      heure: "10:00",
      duree: 30,
      lieu: "Appel téléphonique",
      client: "Clinique Saint-Jean",
      statut: "a-faire",
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "chantier":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "commercial":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "maintenance":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "relance":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "confirme":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "planifie":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "a-faire":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "chantier":
        return "Chantier"
      case "commercial":
        return "Commercial"
      case "maintenance":
        return "Maintenance"
      case "relance":
        return "Relance"
      default:
        return type
    }
  }

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case "confirme":
        return "Confirmé"
      case "planifie":
        return "Planifié"
      case "a-faire":
        return "À faire"
      default:
        return statut
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const groupEventsByDate = () => {
    const grouped: { [key: string]: typeof events } = {}
    events.forEach((event) => {
      if (!grouped[event.date]) {
        grouped[event.date] = []
      }
      grouped[event.date].push(event)
    })
    return grouped
  }

  const groupedEvents = groupEventsByDate()

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agenda</h1>
          <p className="text-gray-600 dark:text-gray-400">Planifiez et suivez vos rendez-vous</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau rendez-vous
        </Button>
      </div>

      {/* Navigation et vues */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Janvier 2024</h2>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={view === "day" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("day")}
                className={view === "day" ? "" : "bg-white dark:bg-gray-900 text-gray-900 dark:text-white"}
              >
                Jour
              </Button>
              <Button
                variant={view === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("week")}
                className={view === "week" ? "" : "bg-white dark:bg-gray-900 text-gray-900 dark:text-white"}
              >
                Semaine
              </Button>
              <Button
                variant={view === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setView("month")}
                className={view === "month" ? "" : "bg-white dark:bg-gray-900 text-gray-900 dark:text-white"}
              >
                Mois
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résumé du jour */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{events.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Événements cette semaine</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{events.filter((e) => e.type === "chantier").length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Visites chantier</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {events.filter((e) => e.type === "commercial").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">RDV commerciaux</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {events.filter((e) => e.statut === "a-faire").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Actions à faire</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des événements par date */}
      <div className="space-y-6">
        {Object.entries(groupedEvents).map(([date, dateEvents]) => (
          <Card key={date}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                {formatDate(date)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dateEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-16">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{event.heure}</p>
                      <p className="text-xs text-gray-500">{event.duree}min</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{event.titre}</h4>
                        <Badge className={getEventTypeColor(event.type)}>{getEventTypeLabel(event.type)}</Badge>
                        <Badge className={getStatusColor(event.statut)}>{getStatusLabel(event.statut)}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {event.client}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.lieu}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    >
                      Modifier
                    </Button>
                    {event.statut === "planifie" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Confirmer
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {Object.keys(groupedEvents).length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <CalendarIcon className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun événement planifié</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Commencez par ajouter un nouveau rendez-vous à votre agenda.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
