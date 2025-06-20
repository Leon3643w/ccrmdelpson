"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Euro, Calendar, User, MoreHorizontal } from "lucide-react"

export default function Opportunites() {
  const [opportunities] = useState([
    {
      id: "OPP-001",
      nom: "Installation réseau - Hotel Bellevue",
      client: "Hotel Bellevue",
      valeur: 15000,
      statut: "prospection",
      dateCreation: "2024-01-10",
      probabilite: 30,
    },
    {
      id: "OPP-002",
      nom: "Maintenance annuelle - Clinique Saint-Jean",
      client: "Clinique Saint-Jean",
      valeur: 8500,
      statut: "devis-envoye",
      dateCreation: "2024-01-08",
      probabilite: 70,
    },
    {
      id: "OPP-003",
      nom: "Rénovation électrique - Lycée Pasteur",
      client: "Lycée Pasteur",
      valeur: 25000,
      statut: "negociation",
      dateCreation: "2024-01-05",
      probabilite: 85,
    },
    {
      id: "OPP-004",
      nom: "Installation éclairage - Centre Commercial",
      client: "Immobilière du Centre",
      valeur: 12000,
      statut: "gagne",
      dateCreation: "2023-12-20",
      probabilite: 100,
    },
  ])

  const colonnes = [
    { id: "prospection", titre: "Prospection", couleur: "bg-gray-100 dark:bg-gray-800" },
    { id: "devis-envoye", titre: "Devis envoyé", couleur: "bg-blue-100 dark:bg-blue-900" },
    { id: "negociation", titre: "Négociation", couleur: "bg-orange-100 dark:bg-orange-900" },
    { id: "gagne", titre: "Gagné", couleur: "bg-green-100 dark:bg-green-900" },
    { id: "perdu", titre: "Perdu", couleur: "bg-red-100 dark:bg-red-900" },
  ]

  const getOpportunitiesByStatus = (statut: string) => {
    return opportunities.filter((opp) => opp.statut === statut)
  }

  const getProbabilityColor = (probabilite: number) => {
    if (probabilite >= 80) return "text-green-600"
    if (probabilite >= 50) return "text-orange-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Opportunités commerciales</h1>
          <p className="text-gray-600 dark:text-gray-400">Pipeline de vente et suivi des prospects</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle opportunité
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{opportunities.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total opportunités</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {opportunities.reduce((sum, opp) => sum + opp.valeur, 0).toLocaleString()}€
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Valeur totale</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{getOpportunitiesByStatus("gagne").length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Opportunités gagnées</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(opportunities.reduce((sum, opp) => sum + opp.probabilite, 0) / opportunities.length)}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Probabilité moyenne</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-x-auto">
        {colonnes.map((colonne) => (
          <div key={colonne.id} className="min-w-80 lg:min-w-0">
            <Card className={colonne.couleur}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {colonne.titre}
                  <Badge variant="secondary" className="bg-white/20">
                    {getOpportunitiesByStatus(colonne.id).length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getOpportunitiesByStatus(colonne.id).map((opportunite) => (
                  <Card
                    key={opportunite.id}
                    className="bg-white dark:bg-gray-800 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
                            {opportunite.nom}
                          </h4>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">{opportunite.client}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Euro className="w-3 h-3 text-gray-500" />
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              {opportunite.valeur.toLocaleString()}€
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">{opportunite.dateCreation}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-xs text-gray-500">Probabilité</span>
                          <span className={`text-xs font-medium ${getProbabilityColor(opportunite.probabilite)}`}>
                            {opportunite.probabilite}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {getOpportunitiesByStatus(colonne.id).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-gray-500">Aucune opportunité</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
