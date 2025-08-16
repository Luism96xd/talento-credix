import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { Plus } from 'lucide-react'

interface AdminInterfaceProps {
  onClose: () => void
}

export function AdminInterface({ onClose }: AdminInterfaceProps) {
  const { toast } = useToast()
  const [countries, setCountries] = useState<any[]>([])
  const [companies, setCompanies] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [positions, setPositions] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('countries')

  // Form states
  const [newCountry, setNewCountry] = useState({ name: '', code: '' })
  const [newCompany, setNewCompany] = useState({ name: '', country_id: '' })
  const [newDepartment, setNewDepartment] = useState({ name: '', company_id: '' })
  const [newPosition, setNewPosition] = useState({ name: '', department_id: '' })
  const [newLevel, setNewLevel] = useState({ position_id: '', level: '', step: '' })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [countriesRes, companiesRes, departmentsRes, positionsRes] = await Promise.all([
        supabase.from('countries').select('*').order('name'),
        supabase.from('companies').select('*, countries(name)').order('name'),
        supabase.from('departments').select('*, companies(name)').order('name'),
        supabase.from('positions').select('*, departments(name)').order('name')
      ])

      setCountries(countriesRes.data || [])
      setCompanies(companiesRes.data || [])
      setDepartments(departmentsRes.data || [])
      setPositions(positionsRes.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const addCountry = async () => {
    if (!newCountry.name || !newCountry.code) return

    try {
      const { error } = await supabase
        .from('countries')
        .insert([newCountry])

      if (error) throw error
      
      toast({ title: 'País agregado exitosamente' })
      setNewCountry({ name: '', code: '' })
      fetchData()
    } catch (error) {
      toast({ title: 'Error al agregar país', variant: 'destructive' })
    }
  }

  const addCompany = async () => {
    if (!newCompany.name || !newCompany.country_id) return

    try {
      const { error } = await supabase
        .from('companies')
        .insert([newCompany])

      if (error) throw error
      
      toast({ title: 'Compañía agregada exitosamente' })
      setNewCompany({ name: '', country_id: '' })
      fetchData()
    } catch (error) {
      toast({ title: 'Error al agregar compañía', variant: 'destructive' })
    }
  }

  const addDepartment = async () => {
    if (!newDepartment.name || !newDepartment.company_id) return

    try {
      const { error } = await supabase
        .from('departments')
        .insert([newDepartment])

      if (error) throw error
      
      toast({ title: 'Departamento agregado exitosamente' })
      setNewDepartment({ name: '', company_id: '' })
      fetchData()
    } catch (error) {
      toast({ title: 'Error al agregar departamento', variant: 'destructive' })
    }
  }

  const addPosition = async () => {
    if (!newPosition.name || !newPosition.department_id) return

    try {
      const { error } = await supabase
        .from('positions')
        .insert([newPosition])

      if (error) throw error
      
      toast({ title: 'Posición agregada exitosamente' })
      setNewPosition({ name: '', department_id: '' })
      fetchData()
    } catch (error) {
      toast({ title: 'Error al agregar posición', variant: 'destructive' })
    }
  }

  const addLevel = async () => {
    if (!newLevel.position_id || !newLevel.level || !newLevel.step) return

    try {
      const { error } = await supabase
        .from('position_levels')
        .insert([newLevel])

      if (error) throw error
      
      toast({ title: 'Nivel agregado exitosamente' })
      setNewLevel({ position_id: '', level: '', step: '' })
    } catch (error) {
      toast({ title: 'Error al agregar nivel', variant: 'destructive' })
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto border-2 border-foreground rounded-none">
        <CardHeader className="border-b-2 border-foreground">
          <div className="flex justify-between items-center">
            <CardTitle>Administración de Datos</CardTitle>
            <Button onClick={onClose} variant="outline" className="border-2 border-foreground rounded-none">
              Cerrar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 border-2 border-foreground rounded-none bg-background">
              <TabsTrigger value="countries" className="rounded-none">Países</TabsTrigger>
              <TabsTrigger value="companies" className="rounded-none">Compañías</TabsTrigger>
              <TabsTrigger value="departments" className="rounded-none">Departamentos</TabsTrigger>
              <TabsTrigger value="positions" className="rounded-none">Posiciones</TabsTrigger>
            </TabsList>

            <TabsContent value="countries" className="space-y-4">
              <Card className="border-2 border-foreground rounded-none">
                <CardHeader>
                  <CardTitle>Agregar País</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nombre</Label>
                      <Input
                        value={newCountry.name}
                        onChange={(e) => setNewCountry({...newCountry, name: e.target.value})}
                        className="border-2 border-foreground rounded-none"
                      />
                    </div>
                    <div>
                      <Label>Código</Label>
                      <Input
                        value={newCountry.code}
                        onChange={(e) => setNewCountry({...newCountry, code: e.target.value})}
                        className="border-2 border-foreground rounded-none"
                      />
                    </div>
                  </div>
                  <Button onClick={addCountry} className="border-2 border-foreground rounded-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar País
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <h3 className="font-medium">Países Existentes</h3>
                {countries.map((country) => (
                  <div key={country.id} className="flex justify-between items-center p-2 border border-foreground">
                    <span>{country.name} ({country.code})</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="companies" className="space-y-4">
              <Card className="border-2 border-foreground rounded-none">
                <CardHeader>
                  <CardTitle>Agregar Compañía</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nombre</Label>
                      <Input
                        value={newCompany.name}
                        onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                        className="border-2 border-foreground rounded-none"
                      />
                    </div>
                    <div>
                      <Label>País</Label>
                      <Select value={newCompany.country_id} onValueChange={(value) => setNewCompany({...newCompany, country_id: value})}>
                        <SelectTrigger className="border-2 border-foreground rounded-none">
                          <SelectValue placeholder="Seleccionar país" />
                        </SelectTrigger>
                        <SelectContent className="border-2 border-foreground rounded-none">
                          {countries.map((country) => (
                            <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={addCompany} className="border-2 border-foreground rounded-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Compañía
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <h3 className="font-medium">Compañías Existentes</h3>
                {companies.map((company) => (
                  <div key={company.id} className="flex justify-between items-center p-2 border border-foreground">
                    <span>{company.name} - {company.countries?.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="departments" className="space-y-4">
              <Card className="border-2 border-foreground rounded-none">
                <CardHeader>
                  <CardTitle>Agregar Departamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nombre</Label>
                      <Input
                        value={newDepartment.name}
                        onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                        className="border-2 border-foreground rounded-none"
                      />
                    </div>
                    <div>
                      <Label>Compañía</Label>
                      <Select value={newDepartment.company_id} onValueChange={(value) => setNewDepartment({...newDepartment, company_id: value})}>
                        <SelectTrigger className="border-2 border-foreground rounded-none">
                          <SelectValue placeholder="Seleccionar compañía" />
                        </SelectTrigger>
                        <SelectContent className="border-2 border-foreground rounded-none">
                          {companies.map((company) => (
                            <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={addDepartment} className="border-2 border-foreground rounded-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Departamento
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <h3 className="font-medium">Departamentos Existentes</h3>
                {departments.map((department) => (
                  <div key={department.id} className="flex justify-between items-center p-2 border border-foreground">
                    <span>{department.name} - {department.companies?.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="positions" className="space-y-4">
              <Card className="border-2 border-foreground rounded-none">
                <CardHeader>
                  <CardTitle>Agregar Posición</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Nombre</Label>
                      <Input
                        value={newPosition.name}
                        onChange={(e) => setNewPosition({...newPosition, name: e.target.value})}
                        className="border-2 border-foreground rounded-none"
                      />
                    </div>
                    <div>
                      <Label>Departamento</Label>
                      <Select value={newPosition.department_id} onValueChange={(value) => setNewPosition({...newPosition, department_id: value})}>
                        <SelectTrigger className="border-2 border-foreground rounded-none">
                          <SelectValue placeholder="Seleccionar departamento" />
                        </SelectTrigger>
                        <SelectContent className="border-2 border-foreground rounded-none">
                          {departments.map((department) => (
                            <SelectItem key={department.id} value={department.id}>{department.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={addPosition} className="border-2 border-foreground rounded-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Posición
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-foreground rounded-none">
                <CardHeader>
                  <CardTitle>Agregar Nivel y Paso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Posición</Label>
                      <Select value={newLevel.position_id} onValueChange={(value) => setNewLevel({...newLevel, position_id: value})}>
                        <SelectTrigger className="border-2 border-foreground rounded-none">
                          <SelectValue placeholder="Seleccionar posición" />
                        </SelectTrigger>
                        <SelectContent className="border-2 border-foreground rounded-none">
                          {positions.map((position) => (
                            <SelectItem key={position.id} value={position.id}>{position.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Nivel</Label>
                      <Input
                        value={newLevel.level}
                        onChange={(e) => setNewLevel({...newLevel, level: e.target.value})}
                        placeholder="ej: Gerencial 1"
                        className="border-2 border-foreground rounded-none"
                      />
                    </div>
                    <div>
                      <Label>Paso</Label>
                      <Input
                        value={newLevel.step}
                        onChange={(e) => setNewLevel({...newLevel, step: e.target.value})}
                        placeholder="ej: 1.5"
                        className="border-2 border-foreground rounded-none"
                      />
                    </div>
                  </div>
                  <Button onClick={addLevel} className="border-2 border-foreground rounded-none">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Nivel
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <h3 className="font-medium">Posiciones Existentes</h3>
                {positions.map((position) => (
                  <div key={position.id} className="flex justify-between items-center p-2 border border-foreground">
                    <span>{position.name} - {position.departments?.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}