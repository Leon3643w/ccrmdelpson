"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, MapPin, Calendar, User, MoreHorizontal } from "lucide-react"

export default function Chantiers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("tous")

  const chantiers = [
    {
      id: "CH-2024-001",
      nom: "Installation électrique - Bureaux Dupont",
      client: "Entreprise Dupont",
      statut: "en-cours",
      dateDebut: "2024-01-15",
      dateFin: "2024-02-15",
      adresse: "123 Rue de la Paix, Paris",
      progression: 65,
    },
    {
      id: "CH-2024-002",
      nom: "Maintenance système - SARL Martin",
      client: "SARL Martin",
      statut: "planifie",
      dateDebut: "2024-01-20",
      dateFin: "2024-01-25",
      adresse: "456 Avenue des Champs, Lyon",
      progression: 0,
    },
    {
      id: "CH-2024-003",
      nom: "Rénovation complète - SAS Lefebvre",
      client: "SAS Lefebvre",
      statut: "termine",
      dateDebut: "2023-12-01",
      dateFin: "2024-01-10",
      adresse: "789 Boulevard Central, Marseille",
      progression: 100,
    },
  ]

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "en-cours":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "planifie":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "termine":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "en-attente":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case "en-cours":
        return "En cours"
      case "planifie":
        return "Planifié"
      case "termine":
        return "Terminé"
      case "en-attente":
        return "En attente"
      default:
        return statut
    }
  }

  const filteredChantiers = chantiers.filter((chantier) => {
    const matchesSearch =
      chantier.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chantier.client.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "tous" || chantier.statut === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chantiers</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez vos chantiers en cours et terminés</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Créer un chantier
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un chantier ou client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="en-cours">En cours</SelectItem>
                <SelectItem value="planifie">Planifié</SelectItem>
                <SelectItem value="termine">Terminé</SelectItem>
                <SelectItem value="en-attente">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des chantiers */}
      <div className="grid gap-6">
        {filteredChantiers.map((chantier) => (
          <Card key={chantier.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{chantier.nom}</CardTitle>
                    <Badge className={getStatusColor(chantier.statut)}>{getStatusLabel(chantier.statut)}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#{chantier.id}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{chantier.client}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{chantier.adresse}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {chantier.dateDebut} - {chantier.dateFin}
                  </span>
                </div>
              </div>

              {chantier.statut === "en-cours" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progression</span>
                    <span className="font-medium">{chantier.progression}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${chantier.progression}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  Voir détails
                </Button>
                <Button variant="outline" size="sm" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  Modifier
                </Button>
                {chantier.statut === "en-cours" && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Marquer terminé
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChantiers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun chantier trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos critères de recherche ou créez un nouveau chantier.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
