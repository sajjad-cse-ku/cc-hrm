import { Head, Link, router } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { useForm } from 'react-hook-form'
import AdminLayout from '@/layouts/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Building2 } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Branch {
  id: number
  branch_name: string
  address: string
  city: string
  state: string
  country: string
  zip_code: string
  status: 'active' | 'inactive'
}

interface EditBranchForm {
  branch_name: string
  address: string
  city: string
  state: string
  country: string
  zip_code: string
  status: 'active' | 'inactive'
}

interface Props {
  branch: Branch
}

export default function Edit({ branch }: Props) {
  console.log(branch)
  const [processing, setProcessing] = useState(false)
  
  // Extract the actual branch data
  const branchData = branch
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors }
  } = useForm<EditBranchForm>({
    defaultValues: {
      branch_name: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
      status: 'active'
    }
  })

  // Populate form with branch data when component mounts or branch data changes
  useEffect(() => {
    if (branchData) {
      reset({
        branch_name: branchData.branch_name || '',
        address: branchData.address || '',
        city: branchData.city || '',
        state: branchData.state || '',
        country: branchData.country || '',
        zip_code: branchData.zip_code || '',
        status: branchData.status || 'active'
      })
    }
  }, [branchData, reset])

  const watchedStatus = watch('status') || branchData?.status || 'active'
  const watchedCountry = watch('country') || branchData?.country || ''

  // Debug logging
  useEffect(() => {
    console.log('Branch data:', branchData)
    console.log('Watched status:', watchedStatus)
    console.log('Watched country:', watchedCountry)
    console.log('Form values:', getValues())
  }, [branchData, watchedStatus, watchedCountry, getValues])

  const onSubmit = async (data: EditBranchForm) => {
    setProcessing(true)
    console.log('Submitting data:', data)
    console.log('Branch ID:', branchData.id)
    
    router.put(route('admin.branches.update', branchData.id), data as any, {
      onSuccess: (page) => {
        console.log('Update successful:', page)
        // The controller redirects to admin.branches.index, so this should work
      },
      onError: (errors) => {
        console.error('Validation errors:', errors)
        alert('Error updating branch. Check console for details.')
      },
      onFinish: () => {
        setProcessing(false)
      },
      preserveScroll: true
    })
  }

  return (
    <AdminLayout>
      <Head title={`Edit ${branchData.branch_name}`} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={route('admin.branches.index')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Branches
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Edit Branch</h1>
            <p className="text-sm text-gray-600 mt-1">
              Update the details for {branchData.branch_name}.
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Branch Information
            </CardTitle>
            <CardDescription>
              Update the details for this branch location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Branch Name */}
              <div className="space-y-2">
                <Label htmlFor="branch_name">Branch Name *</Label>
                <Input
                  id="branch_name"
                  type="text"
                  {...register('branch_name', { required: 'Branch name is required' })}
                  placeholder="Enter branch name"
                  className={errors.branch_name ? 'border-red-500' : ''}
                />
                {errors.branch_name && (
                  <p className="text-sm text-red-600">{errors.branch_name.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  {...register('address', { required: 'Address is required' })}
                  placeholder="Enter complete address"
                  rows={3}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                  <p className="text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              {/* City and State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    {...register('city', { required: 'City is required' })}
                    placeholder="Enter city"
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    type="text"
                    {...register('state', { required: 'State is required' })}
                    placeholder="Enter state or province"
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && (
                    <p className="text-sm text-red-600">{errors.state.message}</p>
                  )}
                </div>
              </div>

              {/* Country and Zip Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={watchedCountry} onValueChange={(value) => setValue('country', value)}>
                    <SelectTrigger className={errors.country ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Japan">Japan</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-sm text-red-600">{errors.country.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip_code">Zip/Postal Code *</Label>
                  <Input
                    id="zip_code"
                    type="text"
                    {...register('zip_code', { required: 'Zip code is required' })}
                    placeholder="Enter zip or postal code"
                    className={errors.zip_code ? 'border-red-500' : ''}
                  />
                  {errors.zip_code && (
                    <p className="text-sm text-red-600">{errors.zip_code.message}</p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={watchedStatus} onValueChange={(value: 'active' | 'inactive') => setValue('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-red-600">{errors.status.message}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link href={route('admin.branches.index')}>
                    Cancel
                  </Link>
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Updating...' : 'Update Branch'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
