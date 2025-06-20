"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, FileText, Download, Eye, Calendar, User, Euro, MoreHorizontal } from "lucide-react"

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("tous")
  const [statusFilter, setStatusFilter] = useState("tous")

  const documents = [
    {
      id: "DEV-2024-001",
      nom: "Devis installation électrique - Entreprise Dupont",
      type: "devis",
      client: "Entreprise Dupont",
      montant: 15000,
      statut: "envoye",
      dateCreation: "2024-01-10",
      dateEcheance: "2024-02-10",
      chantier: "CH-2024-001",
    },
    {
      id: "FAC-2024-001",
      nom: "Facture maintenance - SARL Martin",
      type: "facture",
      client: "SARL Martin",
      montant: 2500,
      statut: "payee",
      dateCreation: "2024-01-05",
      dateEcheance: "2024-02-05",
      chantier: "CH-2023-045",
    },
    {
      id: "CON-2024-001",
      nom: "Contrat maintenance annuelle - Hotel Bellevue",
      type: "contrat",
      client: "Hotel Bellevue",
      montant: 8500,
      statut: "signe",
      dateCreation: "2024-01-08",
      dateEcheance: "2025-01-08",
      chantier: null,
    },
    {
      id: "DEV-2024-002",
      nom: "Devis rénovation - Clinique Saint-Jean",
      type: "devis",
      client: "Clinique Saint-Jean",
      montant: 25000,
      statut: "brouillon",
      dateCreation: "2024-01-12",
      dateEcheance: "2024-02-12",
      chantier: null,
    },
    {
      id: "FAC-2024-002",
      nom: "Facture installation - SAS Lefebvre",
      type: "facture",
      client: "SAS Lefebvre",
      montant: 18500,
      statut: "en-attente",
      dateCreation: "2024-01-15",
      dateEcheance: "2024-02-15",
      chantier: "CH-2024-003",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "devis":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "facture":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "contrat":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "brouillon":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "envoye":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "accepte":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "refuse":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "signe":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "payee":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "en-attente":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "devis":
        return "Devis"
      case "facture":
        return "Facture"
      case "contrat":
        return "Contrat"
      default:
        return type
    }
  }

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case "brouillon":
        return "Brouillon"
      case "envoye":
        return "Envoyé"
      case "accepte":
        return "Accepté"
      case "refuse":
        return "Refusé"
      case "signe":
        return "Signé"
      case "payee":
        return "Payée"
      case "en-attente":
        return "En attente"
      default:
        return statut
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "tous" || doc.type === typeFilter
    const matchesStatus = statusFilter === "tous" || doc.statut === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Documents</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez vos devis, factures et contrats</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Plus className="w-4 h-4 mr-2" />
            Créer un devis
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau document
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{documents.filter((d) => d.type === "devis").length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Devis</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {documents.filter((d) => d.type === "facture").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Factures</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {documents.filter((d) => d.type === "contrat").length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contrats</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {documents.reduce((sum, doc) => sum + doc.montant, 0).toLocaleString()}€
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Montant total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un document, client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Type de document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les types</SelectItem>
                <SelectItem value="devis">Devis</SelectItem>
                <SelectItem value="facture">Factures</SelectItem>
                <SelectItem value="contrat">Contrats</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tous">Tous les statuts</SelectItem>
                <SelectItem value="brouillon">Brouillon</SelectItem>
                <SelectItem value="envoye">Envoyé</SelectItem>
                <SelectItem value="accepte">Accepté</SelectItem>
                <SelectItem value="signe">Signé</SelectItem>
                <SelectItem value="payee">Payée</SelectItem>
                <SelectItem value="en-attente">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des documents */}
      <div className="grid gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{document.nom}</h4>
                      <Badge className={getTypeColor(document.type)}>{getTypeLabel(document.type)}</Badge>
                      <Badge className={getStatusColor(document.statut)}>{getStatusLabel(document.statut)}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>#{document.id}</span>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {document.client}
                      </div>
                      <div className="flex items-center gap-1">
                        <Euro className="w-4 h-4" />
                        {document.montant.toLocaleString()}€
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {document.dateCreation}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Voir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FileText className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun document trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier vos critères de recherche ou créez un nouveau document.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
