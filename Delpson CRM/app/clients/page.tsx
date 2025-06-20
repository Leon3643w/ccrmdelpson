"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Phone, Mail, MapPin, Building, Calendar, FileText, MoreHorizontal } from "lucide-react"

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("")

  const clients = [
    {
      id: "CLI-001",
      nom: "Entreprise Dupont",
      contact: "Jean Dupont",
      email: "j.dupont@entreprise-dupont.fr",
      telephone: "01 23 45 67 89",
      adresse: "123 Rue de la Paix, 75001 Paris",
      type: "Entreprise",
      dateCreation: "2023-06-15",
      chantiersActifs: 2,
      chantiersTermines: 5,
      chiffreAffaires: 45000,
    },
    {
      id: "CLI-002",
      nom: "SARL Martin",
      contact: "Marie Martin",
      email: "contact@sarl-martin.com",
      telephone: "04 56 78 90 12",
      adresse: "456 Avenue des Champs, 69000 Lyon",
      type: "SARL",
      dateCreation: "2023-08-20",
      chantiersActifs: 1,
      chantiersTermines: 3,
      chiffreAffaires: 28500,
    },
    {
      id: "CLI-003",
      nom: "SAS Lefebvre",
      contact: "Pierre Lefebvre",
      email: "p.lefebvre@sas-lefebvre.fr",
      telephone: "04 91 23 45 67",
      adresse: "789 Boulevard Central, 13000 Marseille",
      type: "SAS",
      dateCreation: "2023-04-10",
      chantiersActifs: 0,
      chantiersTermines: 8,
      chiffreAffaires: 67500,
    },
    {
      id: "CLI-004",
      nom: "Hotel Bellevue",
      contact: "Sophie Moreau",
      email: "direction@hotel-bellevue.com",
      telephone: "02 34 56 78 90",
      adresse: "321 Promenade de la Mer, 06000 Nice",
      type: "Hôtellerie",
      dateCreation: "2023-09-05",
      chantiersActifs: 1,
      chantiersTermines: 1,
      chiffreAffaires: 15000,
    },
  ]

  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Entreprise":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "SARL":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "SAS":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Hôtellerie":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Clients</h1>
          <p className="text-gray-600 dark:text-gray-400">Gérez votre portefeuille clients</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nouveau client
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{clients.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total clients</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {clients.reduce((sum, client) => sum + client.chantiersActifs, 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Chantiers actifs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {clients.reduce((sum, client) => sum + client.chantiersTermines, 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Chantiers terminés</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {clients.reduce((sum, client) => sum + client.chiffreAffaires, 0).toLocaleString()}€
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">CA total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un client par nom, contact ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des clients */}
      <div className="grid gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{client.nom}</CardTitle>
                    <Badge className={getTypeColor(client.type)}>{client.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">#{client.id}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{client.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{client.telephone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{client.adresse}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Client depuis le {client.dateCreation}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-600">{client.chantiersActifs}</p>
                      <p className="text-xs text-gray-500">En cours</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{client.chantiersTermines}</p>
                      <p className="text-xs text-gray-500">Terminés</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">{client.chiffreAffaires.toLocaleString()}€</p>
                      <p className="text-xs text-gray-500">CA total</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" size="sm" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Voir fiche
                </Button>
                <Button variant="outline" size="sm" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  Modifier
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Nouveau chantier
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun client trouvé</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez de modifier votre recherche ou ajoutez un nouveau client.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
