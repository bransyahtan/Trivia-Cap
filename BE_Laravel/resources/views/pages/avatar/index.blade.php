@extends('components.layout')

@section('title')
    Avatars
@endsection

@section('content')
    @include('components.sidebar')

    @if (session('success-create'))
        <div class="bg-green-200 text-green-700 px-10 py-5 absolute right-10 top-10" onclick="this.style.display = 'none'">
            {{ session('success-create') }}
        </div>
    @endif

    @if (session('success-delete'))
        <div class="bg-red-200 text-red-700 px-10 py-5 absolute right-10 top-10" onclick="this.style.display = 'none'">
            {{ session('success-delete') }}
        </div>
    @endif

    <div class="p-4 sm:ml-64 min-h-screen bg-slate-300">

        <div class="p-5 bg-white rounded-lg dark:border-gray-700">
            <h1 class="text-4xl font-bold ">Avatar</h1>
            <div class="text-blue-500 my-2">
                <a href="#" class="hover:underline">Avatar</a>
            </div>
            <a href="/avatars/add" class="w-fit block ml-auto">
                <button
                    class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    Add Avatar
                </button>
            </a>
            <div class="relative overflow-x-auto shadow-md ">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 max-w-24 ">
                                No.
                            </th>
                            <th scope="col" class="px-6 py-3 max-w-24 ">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Premium
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Image URL
                            </th>
                            <th scope="col" class="px-6 py-3">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($avatars as $avatar)
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4 max-w-32 text-lg overflow-hidden">
                                    {{ $loop->index + 1 }}
                                </td>
                                <th scope="row"
                                    class="px-6 py-4 text-lg whitespace-nowrap dark:text-white max-w-32 overflow-hidden truncate">
                                    {{ $avatar->name }}
                                </th>
                                <td class="px-6 py-4 max-w-32 text-lg overflow-hidden">
                                    {{ $avatar->price }}
                                </td>
                                <td class="px-6 py-4 max-w-32 text-lg overflow-hidden">
                                    @if ($avatar->isPremium)
                                        Yes
                                    @else
                                        No
                                    @endif
                                </td>
                                <td class="px-6 py-4 max-w-32 text-lg overflow-hidden">
                                    {{ $avatar->image_url }}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <a href="/avatars/{{ $avatar->id }}"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detail</a>
                                </td>
                            </tr>
                        @endforeach

                    </tbody>
                </table>
            </div>

        </div>

    </div>
@endsection
