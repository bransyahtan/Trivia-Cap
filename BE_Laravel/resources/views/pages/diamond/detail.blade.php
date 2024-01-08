@extends('components.layout')

@section('title')
    Diamonds
@endsection

@section('content')
    @include('components.sidebar')


    <div class="p-4 sm:ml-64 min-h-screen bg-slate-300">
        <div class="p-5 bg-white rounded-lg  shadow-md dark:border-gray-700">
            <h1 class="text-4xl font-bold">Diamond Informations</h1>
            <div class="text-blue-500 my-2">
                <a href="/diamonds" class="hover:underline">Diamonds</a>
                <span>/</span>
                <a href="#" class="hover:underline">detail</a>
            </div>
            <table
                class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sm:rounded-lg mt-10 relative">

                <thead class="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            &nbsp;
                        </th>
                        <th scope="col" class="px-6 py-3 text-right">
                            {{ $diamond->created_at->format('j F Y') }}
                        </th>
                    </tr>
                </thead>
                <tbody class="sm:rounded-lg">
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4 text-lg overflow-hidden">Pricing</td>
                        <td class="px-6 py-4 text-lg overflow-hidden">{{ $diamond->price }}</td>
                    </tr>
                    <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="px-6 py-4 text-lg overflow-hidden">Amount</td>
                        <td class="px-6 py-4 text-lg overflow-hidden">
                            <div class="flex items-center gap-2">
                                {{ $diamond->amount }}
                                <div class="w-3 h-3 bg-blue-500 z-10 rotate-45"></div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div class="flex mt-5 gap-5 justify-end">
                <form action="/diamonds/{{ $diamond->id }}" method="POST"
                    onsubmit="return confirm('Diamond will be deleted?')">
                    @csrf
                    @method('DELETE')
                    <button type="submit"
                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                    </button>
                </form>
            </div>
        </div>
    </div>
@endsection
