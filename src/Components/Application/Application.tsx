import { useState } from 'react';

export default function Application() {

    const [wordCount, setWordCount] = useState<number>(0);
    const [textValue, setTextValue] = useState<string>("");

    function handleTextAreaInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const text = event.target.value;
        const words = text.trim().split(/\s+/);
        if (text === "") {
            setWordCount(0);
            setTextValue(text);
        } else if (words.length <= 150) {
            setWordCount(words.length);
            setTextValue(text);
        } else {
            setTextValue(words.slice(0, 150).join(" "));
            setWordCount(150);
        }
    }

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /[0-9]/;
        if (!regex.test(keyValue)) {
            event.preventDefault();
        }
    }

    return (
        <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="space-y-10 divide-y divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Application to [Business]</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Your profile information is automatically attached to your application.
                        </p>
                    </div>

                    <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                        <div className="px-4 py-6 sm:p-8">
                            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="hours" className="block text-sm font-medium leading-6 text-gray-900">
                                        How many hours per week can you commit to this swifternship?
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                type="text"
                                                name="hours"
                                                id="hours"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                onKeyPress={handleKeyPress}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="whyInterested" className="block text-sm font-medium leading-6 text-gray-900">
                                        Why are you interested in working at [Business]?
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="whyInterested"
                                            name="whyInterested"
                                            rows={3}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onInput={handleTextAreaInput}
                                            value={textValue}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">
                                        {wordCount}/{150}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
}
